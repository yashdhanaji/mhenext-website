#!/usr/bin/env node

/**
 * Fetch Products from Google Sheets
 *
 * This script fetches product data from Google Sheets and generates src/data/products.js
 *
 * Usage:
 *   node scripts/fetch-products.js
 *
 * Environment Variables:
 *   GOOGLE_SHEET_ID - The ID of your Google Sheet
 *   GOOGLE_API_KEY  - Your Google Sheets API key
 */

import 'dotenv/config';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SHEET_ID, SHEETS, COLUMNS, AVAILABLE_ICONS, CATEGORY_ORDER } from './sheets-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Configuration ───────────────────────────────────────────────────────────

const API_KEY = process.env.GOOGLE_API_KEY;
const OUTPUT_PATH = path.join(__dirname, '../src/data/products.js');

// ─── Validation ──────────────────────────────────────────────────────────────

if (!API_KEY) {
  console.error('❌ Error: GOOGLE_API_KEY environment variable is not set');
  console.error('   Please add GOOGLE_API_KEY to your .env file');
  process.exit(1);
}

if (!SHEET_ID || SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
  console.error('❌ Error: GOOGLE_SHEET_ID is not configured');
  console.error('   Please update GOOGLE_SHEET_ID in scripts/sheets-config.js or .env');
  process.exit(1);
}

// ─── Google Sheets API Client ────────────────────────────────────────────────

const sheets = google.sheets({
  version: 'v4',
  auth: API_KEY,
});

// ─── Helper Functions ────────────────────────────────────────────────────────

/**
 * Fetch a range from Google Sheets
 */
async function fetchSheetRange(range) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });
    return response.data.values || [];
  } catch (error) {
    console.error(`❌ Error fetching range "${range}":`, error.message);
    throw error;
  }
}

/**
 * Parse rows into objects based on column mapping
 */
function parseRows(rows, columnMap, skipHeader = true) {
  const dataRows = skipHeader ? rows.slice(1) : rows;
  return dataRows
    .filter((row) => row && row.length > 0 && row[0]) // Skip empty rows
    .map((row) => {
      const obj = {};
      for (const [key, index] of Object.entries(columnMap)) {
        obj[key] = row[index] || '';
      }
      return obj;
    });
}

/**
 * Group rows by productSlug
 */
function groupByProduct(rows) {
  const grouped = {};
  for (const row of rows) {
    const slug = row.productSlug;
    if (!grouped[slug]) grouped[slug] = [];
    grouped[slug].push(row);
  }
  return grouped;
}

/**
 * Sort rows by order field
 */
function sortByOrder(rows) {
  return rows.sort((a, b) => {
    const orderA = parseInt(a.order) || 0;
    const orderB = parseInt(b.order) || 0;
    return orderA - orderB;
  });
}

/**
 * Convert boolean string to boolean
 */
function parseBool(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return lower === 'true' || lower === 'yes' || lower === '1';
  }
  return false;
}

// ─── Main Function ───────────────────────────────────────────────────────────

async function fetchAndGenerateProducts() {
  console.log('🔄 Fetching product data from Google Sheets...');
  console.log(`   Sheet ID: ${SHEET_ID}`);

  try {
    // Fetch all sheets in parallel
    const [
      productsRows,
      imagesRows,
      quickSpecsRows,
      specsRows,
      featuresRows,
      fullFeaturesRows,
      applicationsRows,
      fullApplicationsRows,
      downloadsRows,
      relatedProductsRows,
      fullSpecsRows,
    ] = await Promise.all([
      fetchSheetRange(SHEETS.PRODUCTS),
      fetchSheetRange(SHEETS.IMAGES),
      fetchSheetRange(SHEETS.QUICK_SPECS),
      fetchSheetRange(SHEETS.SPECS),
      fetchSheetRange(SHEETS.FEATURES),
      fetchSheetRange(SHEETS.FULL_FEATURES),
      fetchSheetRange(SHEETS.APPLICATIONS),
      fetchSheetRange(SHEETS.FULL_APPLICATIONS),
      fetchSheetRange(SHEETS.DOWNLOADS),
      fetchSheetRange(SHEETS.RELATED_PRODUCTS),
      fetchSheetRange(SHEETS.FULL_SPECS),
    ]);

    console.log('✅ Data fetched successfully');

    // Parse each sheet
    const products = parseRows(productsRows, COLUMNS.PRODUCTS);
    const imagesByProduct = groupByProduct(parseRows(imagesRows, COLUMNS.IMAGES));
    const quickSpecsByProduct = groupByProduct(parseRows(quickSpecsRows, COLUMNS.QUICK_SPECS));
    const specsByProduct = groupByProduct(parseRows(specsRows, COLUMNS.SPECS));
    const featuresByProduct = groupByProduct(parseRows(featuresRows, COLUMNS.FEATURES));
    const fullFeaturesByProduct = groupByProduct(parseRows(fullFeaturesRows, COLUMNS.FULL_FEATURES));
    const applicationsByProduct = groupByProduct(parseRows(applicationsRows, COLUMNS.APPLICATIONS));
    const fullApplicationsByProduct = groupByProduct(parseRows(fullApplicationsRows, COLUMNS.FULL_APPLICATIONS));
    const downloadsByProduct = groupByProduct(parseRows(downloadsRows, COLUMNS.DOWNLOADS));
    const relatedByProduct = groupByProduct(parseRows(relatedProductsRows, COLUMNS.RELATED_PRODUCTS));
    const fullSpecsByProduct = groupByProduct(parseRows(fullSpecsRows, COLUMNS.FULL_SPECS));

    console.log(`📦 Building ${products.length} products...`);

    // Build product data map
    const productDataMap = {};

    for (const product of products) {
      const slug = product.slug;

      // Get related data for this product
      const images = sortByOrder(imagesByProduct[slug] || []).map((r) => r.imageURL);
      const quickSpecs = sortByOrder(quickSpecsByProduct[slug] || []).map((r) => ({
        value: r.value,
        label: r.label,
      }));
      const specs = sortByOrder(specsByProduct[slug] || []).map((r) => ({
        label: r.label,
        value: r.value,
      }));
      const features = sortByOrder(featuresByProduct[slug] || []).map((r) => r.text);
      const fullFeatures = sortByOrder(fullFeaturesByProduct[slug] || []).map((r) => ({
        icon: r.icon,
        title: r.title,
        desc: r.desc,
      }));
      const applications = sortByOrder(applicationsByProduct[slug] || []).map((r) => r.name);
      const fullApplications = sortByOrder(fullApplicationsByProduct[slug] || []).map((r) => ({
        icon: r.icon,
        name: r.name,
        desc: r.desc,
      }));
      const downloads = sortByOrder(downloadsByProduct[slug] || []).map((r) => ({
        name: r.name,
        size: r.size,
      }));
      const relatedSlugs = sortByOrder(relatedByProduct[slug] || []).map((r) => r.relatedSlug);
      const fullSpecs = sortByOrder(fullSpecsByProduct[slug] || []).map((r) => ({
        label: r.label,
        value: r.value,
      }));

      // Build badges array (filter out empty values)
      const badges = [product.badge1, product.badge2].filter((b) => b && b.trim());

      // Validate icons
      const invalidIcons = [];
      for (const feature of fullFeatures) {
        if (feature.icon && !AVAILABLE_ICONS.includes(feature.icon)) {
          invalidIcons.push(feature.icon);
        }
      }
      for (const app of fullApplications) {
        if (app.icon && !AVAILABLE_ICONS.includes(app.icon)) {
          invalidIcons.push(app.icon);
        }
      }
      if (invalidIcons.length > 0) {
        console.warn(`⚠️  Product "${slug}" has invalid icons: ${[...new Set(invalidIcons)].join(', ')}`);
        console.warn(`   Available icons: ${AVAILABLE_ICONS.join(', ')}`);
      }

      // Build product object
      productDataMap[slug] = {
        slug,
        name: product.name,
        category: product.category,
        eyebrow: product.eyebrow,
        has3DModel: parseBool(product.has3DModel),
        shortDesc: product.shortDesc,
        description: product.description,
        images,
        badges,
        quickSpecs,
        specs,
        features,
        applications,
        fullSpecs,
        fullFeatures,
        fullApplications,
        downloads,
        relatedSlugs,
      };
    }

    // Generate JavaScript file
    console.log('📝 Generating products.js...');
    const jsContent = generateProductsJS(productDataMap);

    // Write to file
    fs.writeFileSync(OUTPUT_PATH, jsContent, 'utf-8');
    console.log(`✅ Products file generated: ${OUTPUT_PATH}`);
    console.log(`   Total products: ${Object.keys(productDataMap).length}`);

  } catch (error) {
    console.error('❌ Failed to fetch and generate products:', error.message);
    process.exit(1);
  }
}

// ─── JavaScript Generator ────────────────────────────────────────────────────

function generateProductsJS(productDataMap) {
  const imports = AVAILABLE_ICONS.join(', ');

  const iconMapEntries = AVAILABLE_ICONS.join(', ');

  const productEntries = Object.entries(productDataMap)
    .map(([slug, product], index) => {
      const productNumber = index + 1;
      const productTitle = `${product.name}`;

      return `  /* ── ${productNumber}. ${productTitle} ${'─'.repeat(Math.max(0, 70 - productTitle.length))} */
  '${slug}': ${JSON.stringify(product, null, 4).replace(/"([^"]+)":/g, '$1:')},`;
    })
    .join('\n\n');

  const categoryOrderStr = JSON.stringify(CATEGORY_ORDER);

  return `import {
  ${imports}
} from 'lucide-react';

// ─── Icon lookup (for serialisable data → component) ────────────────────────
const iconMap = {
  ${iconMapEntries}
};

export const resolveIcon = (key) => iconMap[key] || Box;

// ─── Product Data Map (keyed by slug) ───────────────────────────────────────
export const productDataMap = {
${productEntries}
};

// ─── Product Categories (derived from productDataMap) ───────────────────────
// Groups products by their \`category\` field for the listing page
const categoryOrder = ${categoryOrderStr};

const grouped = {};
for (const product of Object.values(productDataMap)) {
  if (!grouped[product.category]) grouped[product.category] = [];
  grouped[product.category].push({
    name: product.name,
    desc: product.shortDesc,
    image: product.images[0],
    badges: product.badges,
    specs: product.quickSpecs.slice(0, 3).map((s) => \`\${s.value} \${s.label}\`),
    link: \`/products/\${product.slug}\`,
  });
}

export const productCategories = categoryOrder.map((cat) => ({
  category: cat,
  products: grouped[cat] || [],
}));
`;
}

// ─── Run ─────────────────────────────────────────────────────────────────────

fetchAndGenerateProducts();
