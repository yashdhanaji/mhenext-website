#!/usr/bin/env node

/**
 * Fetch Case Studies from Google Sheets
 *
 * This script fetches case study data from Google Sheets and generates src/data/caseStudies.js
 *
 * Usage:
 *   node scripts/fetch-case-studies.js
 *
 * Environment Variables:
 *   GOOGLE_CASE_STUDIES_SHEET_ID - The ID of your Case Studies Google Sheet
 *   GOOGLE_API_KEY               - Your Google Sheets API key
 *
 * Sheet tabs required:
 *   CaseStudies    (columns A–Q): slug | title | client | industry | location |
 *                  duration | year | thumbnail | heroImage | gallery | excerpt |
 *                  tags | equipment | challenge | solution | results | published
 *   CaseStudyStats (columns A–D): slug | value | label | order
 */

import 'dotenv/config';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CASE_STUDIES_SHEET_ID, SHEETS, COLUMNS } from './sheets-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Configuration ───────────────────────────────────────────────────────────

const API_KEY = process.env.GOOGLE_API_KEY;
const OUTPUT_PATH = path.join(__dirname, '../src/data/caseStudies.js');

// ─── Validation ──────────────────────────────────────────────────────────────

if (!API_KEY) {
  console.error('❌ Error: GOOGLE_API_KEY environment variable is not set');
  console.error('   Please add GOOGLE_API_KEY to your .env file');
  process.exit(1);
}

if (!CASE_STUDIES_SHEET_ID || CASE_STUDIES_SHEET_ID === 'YOUR_CASE_STUDIES_GOOGLE_SHEET_ID_HERE') {
  console.warn('⚠️  GOOGLE_CASE_STUDIES_SHEET_ID is not configured — skipping case studies fetch');
  console.warn('   Add GOOGLE_CASE_STUDIES_SHEET_ID to your .env file to enable this.');
  process.exit(0);
}

// ─── Google Sheets API Client ────────────────────────────────────────────────

const sheets = google.sheets({
  version: 'v4',
  auth: API_KEY,
});

// ─── Helper Functions ────────────────────────────────────────────────────────

async function fetchSheetRange(range) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: CASE_STUDIES_SHEET_ID,
      range,
    });
    return response.data.values || [];
  } catch (error) {
    const tabName = range.split('!')[0];
    if (error.message.includes('Unable to parse range') || error.message.includes('notFound')) {
      console.error(`❌ Tab "${tabName}" not found in your Case Studies Google Sheet.`);
      console.error(`   Open your sheet and make sure a tab is named exactly: ${tabName}`);
      console.error(`   Tab names are case-sensitive. Current config: '${range}'`);
      console.error(`   To fix: rename the tab in Google Sheets, or update scripts/sheets-config.js`);
    } else {
      console.error(`❌ Error fetching range "${range}":`, error.message);
    }
    throw error;
  }
}

function parseBool(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return lower === 'true' || lower === 'yes' || lower === '1';
  }
  return false;
}

function parseCommaSeparated(value) {
  return (value || '').split(',').map((s) => s.trim()).filter(Boolean);
}

function parseResults(value) {
  return (value || '').split('\n').map((s) => s.trim()).filter(Boolean);
}

// ─── Main Function ───────────────────────────────────────────────────────────

async function fetchAndGenerateCaseStudies() {
  console.log('🔄 Fetching case studies from Google Sheets...');
  console.log(`   Case Studies Sheet ID: ${CASE_STUDIES_SHEET_ID}`);

  try {
    const [caseStudyRows, statsRows] = await Promise.all([
      fetchSheetRange(SHEETS.CASE_STUDIES),
      fetchSheetRange(SHEETS.CASE_STUDY_STATS),
    ]);

    console.log('✅ Data fetched successfully');

    const CS = COLUMNS.CASE_STUDIES;
    const SS = COLUMNS.CASE_STUDY_STATS;

    // Parse stats, grouped by slug
    const statsBySlug = {};
    statsRows
      .slice(1)
      .filter((row) => row && row.length > 0 && row[SS.SLUG])
      .forEach((row) => {
        const slug = row[SS.SLUG];
        if (!statsBySlug[slug]) statsBySlug[slug] = [];
        statsBySlug[slug].push({
          order: parseInt(row[SS.ORDER]) || 0,
          value: row[SS.VALUE] || '',
          label: row[SS.LABEL] || '',
        });
      });

    // Sort stats
    Object.keys(statsBySlug).forEach((slug) => {
      statsBySlug[slug].sort((a, b) => a.order - b.order);
    });

    // Parse case studies (skip header, filter published only)
    const caseStudies = caseStudyRows
      .slice(1)
      .filter((row) => row && row.length > 0 && row[CS.SLUG] && parseBool(row[CS.PUBLISHED]))
      .map((row) => ({
        slug:      row[CS.SLUG]       || '',
        title:     row[CS.TITLE]      || '',
        client:    row[CS.CLIENT]     || '',
        industry:  row[CS.INDUSTRY]   || '',
        location:  row[CS.LOCATION]   || '',
        duration:  row[CS.DURATION]   || '',
        year:      row[CS.YEAR]       || '',
        thumbnail: row[CS.THUMBNAIL]  || '',
        heroImage: row[CS.HERO_IMAGE] || '',
        gallery:   parseCommaSeparated(row[CS.GALLERY]),
        excerpt:   row[CS.EXCERPT]    || '',
        tags:      parseCommaSeparated(row[CS.TAGS]),
        equipment: parseCommaSeparated(row[CS.EQUIPMENT]),
        challenge: row[CS.CHALLENGE]  || '',
        solution:  row[CS.SOLUTION]   || '',
        results:   parseResults(row[CS.RESULTS]),
        stats:     (statsBySlug[row[CS.SLUG]] || []).map(({ value, label }) => ({ value, label })),
      }));

    console.log(`📝 Parsed ${caseStudies.length} published case study/studies`);

    const industries = [...new Set(caseStudies.map((cs) => cs.industry).filter(Boolean))];
    const industryFilters = ['All', ...industries];

    console.log('📝 Generating caseStudies.js...');
    const jsContent = generateCaseStudiesJS(caseStudies, industryFilters);

    fs.writeFileSync(OUTPUT_PATH, jsContent, 'utf-8');
    console.log(`✅ Case studies file generated: ${OUTPUT_PATH}`);
    console.log(`   Total case studies: ${caseStudies.length}`);

  } catch (error) {
    console.warn('⚠️  Case studies fetch failed — using existing src/data/caseStudies.js if it exists.');
    console.warn('   Fix the issue above, then re-run: npm run fetch-case-studies');
    process.exit(0);
  }
}

// ─── JavaScript Generator ────────────────────────────────────────────────────

function generateCaseStudiesJS(caseStudies, industryFilters) {
  return `// AUTO-GENERATED — do not edit manually.
// Update via Google Sheets and run: npm run fetch-case-studies

export const caseStudies = ${JSON.stringify(caseStudies, null, 2)};

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((cs) => cs.slug === slug) || null;
}

export const industryFilters = ${JSON.stringify(industryFilters)};
`;
}

// ─── Run ─────────────────────────────────────────────────────────────────────

fetchAndGenerateCaseStudies();
