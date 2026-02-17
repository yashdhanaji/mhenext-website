#!/usr/bin/env node

/**
 * Migrate Blog Data to Google Sheets CSV
 *
 * One-time script that exports the current hardcoded blog.js content to two
 * CSV files ready for pasting into Google Sheets as the initial import.
 *
 * Output:
 *   migration-output/blog-posts.csv    — one row per post (columns A–M)
 *   migration-output/blog-content.csv  — one row per content block (columns A–F)
 *
 * Usage:
 *   node scripts/migrate-blog-to-sheets.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Escape a value for CSV: wrap in quotes and double any inner quotes.
 */
function csvCell(value) {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function csvRow(cells) {
  return cells.map(csvCell).join(',');
}

// ─── Load current blog data ───────────────────────────────────────────────────

// Import the hardcoded data directly (this runs as ESM)
const blogDataPath = path.join(__dirname, '../src/data/blog.js');
const { blogPosts } = await import(blogDataPath);

// ─── Build CSV content ───────────────────────────────────────────────────────

// BlogPosts tab header (columns A–M)
const postsHeader = [
  'slug', 'title', 'category', 'date', 'readTime',
  'authorName', 'authorRole', 'thumbnail', 'heroImage',
  'excerpt', 'tags', 'featured', 'published',
];

const postsRows = [
  csvRow(postsHeader),
  ...blogPosts.map((post) =>
    csvRow([
      post.slug,
      post.title,
      post.category,
      post.date,
      post.readTime,
      post.author?.name ?? '',
      post.author?.role ?? '',
      post.thumbnail,
      post.heroImage,
      post.excerpt,
      Array.isArray(post.tags) ? post.tags.join(',') : (post.tags ?? ''),
      post.featured ? 'TRUE' : 'FALSE',
      'TRUE', // all existing posts are published
    ])
  ),
];

// BlogContent tab header (columns A–F)
const contentHeader = ['slug', 'order', 'type', 'text', 'value', 'label'];

const contentRows = [csvRow(contentHeader)];
for (const post of blogPosts) {
  (post.content || []).forEach((block, index) => {
    contentRows.push(
      csvRow([
        post.slug,
        index + 1,
        block.type,
        block.type !== 'stat' ? (block.text ?? '') : '',
        block.type === 'stat' ? (block.value ?? '') : '',
        block.type === 'stat' ? (block.label ?? '') : '',
      ])
    );
  });
}

// ─── Write output files ───────────────────────────────────────────────────────

const outputDir = path.join(__dirname, '../migration-output');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const postsCsvPath = path.join(outputDir, 'blog-posts.csv');
const contentCsvPath = path.join(outputDir, 'blog-content.csv');

fs.writeFileSync(postsCsvPath, postsRows.join('\n'), 'utf-8');
fs.writeFileSync(contentCsvPath, contentRows.join('\n'), 'utf-8');

console.log('✅ Migration CSV files generated:');
console.log(`   ${postsCsvPath}`);
console.log(`   ${contentCsvPath}`);
console.log();
console.log('Next steps:');
console.log('  1. Open your Google Sheet');
console.log('  2. Create a tab named "BlogPosts" and paste the contents of blog-posts.csv');
console.log('  3. Create a tab named "BlogContent" and paste the contents of blog-content.csv');
console.log('  4. Run: npm run fetch-blog');
