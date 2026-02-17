#!/usr/bin/env node

/**
 * Migrate Case Studies to Google Sheets
 *
 * One-time script: reads src/data/caseStudies.js (hardcoded data) and outputs
 * two CSV files ready to import into Google Sheets:
 *   migration-output/case-studies.csv      → paste into CaseStudies tab
 *   migration-output/case-study-stats.csv  → paste into CaseStudyStats tab
 *
 * Usage:
 *   node scripts/migrate-case-studies-to-sheets.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { caseStudies } from '../src/data/caseStudies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../migration-output');

// ─── CSV Helper ───────────────────────────────────────────────────────────────

function escapeCSV(value) {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function rowToCSV(fields) {
  return fields.map(escapeCSV).join(',');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function migrate() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // ── CaseStudies CSV ──
  const csHeader = [
    'slug', 'title', 'client', 'industry', 'location', 'duration', 'year',
    'thumbnail', 'heroImage', 'gallery', 'excerpt', 'tags', 'equipment',
    'challenge', 'solution', 'results', 'published',
  ];

  const csRows = [rowToCSV(csHeader)];
  for (const cs of caseStudies) {
    csRows.push(rowToCSV([
      cs.slug,
      cs.title,
      cs.client,
      cs.industry,
      cs.location,
      cs.duration,
      cs.year,
      cs.thumbnail,
      cs.heroImage,
      (cs.gallery || []).join(', '),
      cs.excerpt,
      (cs.tags || []).join(', '),
      (cs.equipment || []).join(', '),
      cs.challenge,
      cs.solution,
      (cs.results || []).join('\n'),
      'TRUE',
    ]));
  }

  const csPath = path.join(OUTPUT_DIR, 'case-studies.csv');
  fs.writeFileSync(csPath, csRows.join('\n'), 'utf-8');
  console.log(`✅ Written: ${csPath}`);

  // ── CaseStudyStats CSV ──
  const statsHeader = ['slug', 'value', 'label', 'order'];
  const statsRows = [rowToCSV(statsHeader)];

  for (const cs of caseStudies) {
    (cs.stats || []).forEach((stat, i) => {
      statsRows.push(rowToCSV([cs.slug, stat.value, stat.label, i + 1]));
    });
  }

  const statsPath = path.join(OUTPUT_DIR, 'case-study-stats.csv');
  fs.writeFileSync(statsPath, statsRows.join('\n'), 'utf-8');
  console.log(`✅ Written: ${statsPath}`);

  console.log('\n📋 Next steps:');
  console.log('   1. Create a new Google Sheet for Case Studies');
  console.log('   2. Import case-studies.csv into a tab named "CaseStudies"');
  console.log('   3. Import case-study-stats.csv into a tab named "CaseStudyStats"');
  console.log('   4. Add GOOGLE_CASE_STUDIES_SHEET_ID to your .env file');
  console.log('   5. Share the sheet with your service account email (Editor role)');
}

migrate();
