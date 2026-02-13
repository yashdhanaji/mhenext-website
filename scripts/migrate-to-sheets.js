#!/usr/bin/env node

/**
 * Migrate Products to Google Sheets CSV Format
 *
 * This script reads the existing src/data/products.js file and generates
 * CSV files for each Google Sheet tab to facilitate one-time data migration.
 *
 * Usage:
 *   node scripts/migrate-to-sheets.js
 *
 * Output:
 *   Creates CSV files in ./migration-output/ directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Configuration ───────────────────────────────────────────────────────────

const PRODUCTS_FILE = path.join(__dirname, '../src/data/products.js');
const OUTPUT_DIR = path.join(__dirname, '../migration-output');

// ─── Helper Functions ────────────────────────────────────────────────────────

/**
 * Escape CSV value (handle quotes and commas)
 */
function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Convert array of objects to CSV string
 */
function arrayToCSV(headers, rows) {
  const headerRow = headers.map(escapeCSV).join(',');
  const dataRows = rows.map((row) => headers.map((h) => escapeCSV(row[h])).join(','));
  return [headerRow, ...dataRows].join('\n');
}

/**
 * Write CSV file
 */
function writeCSV(filename, headers, rows) {
  const csvContent = arrayToCSV(headers, rows);
  const filePath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filePath, csvContent, 'utf-8');
  console.log(`✅ Created: ${filename} (${rows.length} rows)`);
}

// ─── Import Product Data ─────────────────────────────────────────────────────

async function loadProductData() {
  try {
    // Dynamic import of the products.js file
    const { productDataMap } = await import(PRODUCTS_FILE);
    return productDataMap;
  } catch (error) {
    console.error(`❌ Error loading products from ${PRODUCTS_FILE}:`, error.message);
    process.exit(1);
  }
}

// ─── Main Migration Function ─────────────────────────────────────────────────

async function migrateToCSV() {
  console.log('🔄 Starting migration from products.js to CSV files...\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load product data
  const productDataMap = await loadProductData();
  const products = Object.values(productDataMap);

  console.log(`📦 Found ${products.length} products\n`);

  // ─── 1. Products ───────────────────────────────────────────────────────────

  const productsRows = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    eyebrow: p.eyebrow,
    has3DModel: p.has3DModel ? 'TRUE' : 'FALSE',
    shortDesc: p.shortDesc,
    description: p.description,
    badge1: p.badges[0] || '',
    badge2: p.badges[1] || '',
  }));

  writeCSV('1-Products.csv', ['slug', 'name', 'category', 'eyebrow', 'has3DModel', 'shortDesc', 'description', 'badge1', 'badge2'], productsRows);

  // ─── 2. Images ─────────────────────────────────────────────────────────────

  const imagesRows = [];
  for (const product of products) {
    product.images.forEach((imageURL, index) => {
      imagesRows.push({
        productSlug: product.slug,
        imageURL,
        order: index + 1,
      });
    });
  }

  writeCSV('2-Images.csv', ['productSlug', 'imageURL', 'order'], imagesRows);

  // ─── 3. QuickSpecs ─────────────────────────────────────────────────────────

  const quickSpecsRows = [];
  for (const product of products) {
    product.quickSpecs.forEach((spec, index) => {
      quickSpecsRows.push({
        productSlug: product.slug,
        value: spec.value,
        label: spec.label,
        order: index + 1,
      });
    });
  }

  writeCSV('3-QuickSpecs.csv', ['productSlug', 'value', 'label', 'order'], quickSpecsRows);

  // ─── 4. Specs ──────────────────────────────────────────────────────────────

  const specsRows = [];
  for (const product of products) {
    product.specs.forEach((spec, index) => {
      specsRows.push({
        productSlug: product.slug,
        label: spec.label,
        value: spec.value,
        order: index + 1,
      });
    });
  }

  writeCSV('4-Specs.csv', ['productSlug', 'label', 'value', 'order'], specsRows);

  // ─── 5. Features ───────────────────────────────────────────────────────────

  const featuresRows = [];
  for (const product of products) {
    product.features.forEach((text, index) => {
      featuresRows.push({
        productSlug: product.slug,
        text,
        order: index + 1,
      });
    });
  }

  writeCSV('5-Features.csv', ['productSlug', 'text', 'order'], featuresRows);

  // ─── 6. FullFeatures ───────────────────────────────────────────────────────

  const fullFeaturesRows = [];
  for (const product of products) {
    product.fullFeatures.forEach((feature, index) => {
      fullFeaturesRows.push({
        productSlug: product.slug,
        icon: feature.icon,
        title: feature.title,
        desc: feature.desc,
        order: index + 1,
      });
    });
  }

  writeCSV('6-FullFeatures.csv', ['productSlug', 'icon', 'title', 'desc', 'order'], fullFeaturesRows);

  // ─── 7. Applications ───────────────────────────────────────────────────────

  const applicationsRows = [];
  for (const product of products) {
    product.applications.forEach((name, index) => {
      applicationsRows.push({
        productSlug: product.slug,
        name,
        order: index + 1,
      });
    });
  }

  writeCSV('7-Applications.csv', ['productSlug', 'name', 'order'], applicationsRows);

  // ─── 8. FullApplications ───────────────────────────────────────────────────

  const fullApplicationsRows = [];
  for (const product of products) {
    product.fullApplications.forEach((app, index) => {
      fullApplicationsRows.push({
        productSlug: product.slug,
        icon: app.icon,
        name: app.name,
        desc: app.desc,
        order: index + 1,
      });
    });
  }

  writeCSV('8-FullApplications.csv', ['productSlug', 'icon', 'name', 'desc', 'order'], fullApplicationsRows);

  // ─── 9. Downloads ──────────────────────────────────────────────────────────

  const downloadsRows = [];
  for (const product of products) {
    product.downloads.forEach((download, index) => {
      downloadsRows.push({
        productSlug: product.slug,
        name: download.name,
        size: download.size,
        order: index + 1,
      });
    });
  }

  writeCSV('9-Downloads.csv', ['productSlug', 'name', 'size', 'order'], downloadsRows);

  // ─── 10. RelatedProducts ───────────────────────────────────────────────────

  const relatedProductsRows = [];
  for (const product of products) {
    product.relatedSlugs.forEach((relatedSlug, index) => {
      relatedProductsRows.push({
        productSlug: product.slug,
        relatedSlug,
        order: index + 1,
      });
    });
  }

  writeCSV('10-RelatedProducts.csv', ['productSlug', 'relatedSlug', 'order'], relatedProductsRows);

  // ─── 11. FullSpecs ─────────────────────────────────────────────────────────

  const fullSpecsRows = [];
  for (const product of products) {
    product.fullSpecs.forEach((spec, index) => {
      fullSpecsRows.push({
        productSlug: product.slug,
        label: spec.label,
        value: spec.value,
        order: index + 1,
      });
    });
  }

  writeCSV('11-FullSpecs.csv', ['productSlug', 'label', 'value', 'order'], fullSpecsRows);

  // ─── Summary ───────────────────────────────────────────────────────────────

  console.log('\n✅ Migration complete!');
  console.log(`📁 CSV files created in: ${OUTPUT_DIR}`);
  console.log('\n📋 Next Steps:');
  console.log('   1. Create a new Google Sheet');
  console.log('   2. Create tabs named: Products, Images, QuickSpecs, Specs, Features, FullFeatures, Applications, FullApplications, Downloads, RelatedProducts, FullSpecs');
  console.log('   3. Import each CSV file into the corresponding tab (File → Import → Upload)');
  console.log('   4. Share the Google Sheet and get its ID from the URL');
  console.log('   5. Update GOOGLE_SHEET_ID in your .env file');
  console.log('   6. Run: npm run fetch-products');
}

// ─── Run ─────────────────────────────────────────────────────────────────────

migrateToCSV();
