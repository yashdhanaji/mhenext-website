#!/usr/bin/env node

/**
 * Fetch Blog Posts from Google Sheets
 *
 * This script fetches blog data from Google Sheets and generates src/data/blog.js
 *
 * Usage:
 *   node scripts/fetch-blog.js
 *
 * Environment Variables:
 *   GOOGLE_BLOG_SHEET_ID - The ID of your Blog Google Sheet (separate from products)
 *   GOOGLE_API_KEY       - Your Google Sheets API key
 *
 * Sheet tabs required:
 *   BlogPosts    (columns A–M): slug | title | category | date | readTime |
 *                authorName | authorRole | thumbnail | heroImage | excerpt |
 *                tags | featured | published
 *   BlogContent  (columns A–F): slug | order | type | text | value | label
 */

import 'dotenv/config';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BLOG_SHEET_ID, SHEETS, COLUMNS } from './sheets-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Configuration ───────────────────────────────────────────────────────────

const API_KEY = process.env.GOOGLE_API_KEY;
const OUTPUT_PATH = path.join(__dirname, '../src/data/blog.js');

// ─── Validation ──────────────────────────────────────────────────────────────

if (!API_KEY) {
  console.error('❌ Error: GOOGLE_API_KEY environment variable is not set');
  console.error('   Please add GOOGLE_API_KEY to your .env file');
  process.exit(1);
}

if (!BLOG_SHEET_ID || BLOG_SHEET_ID === 'YOUR_BLOG_GOOGLE_SHEET_ID_HERE') {
  console.error('❌ Error: GOOGLE_BLOG_SHEET_ID is not configured');
  console.error('   Please add GOOGLE_BLOG_SHEET_ID to your .env file');
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
      spreadsheetId: BLOG_SHEET_ID,
      range,
    });
    return response.data.values || [];
  } catch (error) {
    console.error(`❌ Error fetching range "${range}":`, error.message);
    throw error;
  }
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

async function fetchAndGenerateBlog() {
  console.log('🔄 Fetching blog data from Google Sheets...');
  console.log(`   Blog Sheet ID: ${BLOG_SHEET_ID}`);

  try {
    // Fetch both sheets in parallel
    const [postsRows, contentRows] = await Promise.all([
      fetchSheetRange(SHEETS.BLOG_POSTS),
      fetchSheetRange(SHEETS.BLOG_CONTENT),
    ]);

    console.log('✅ Data fetched successfully');

    const BP = COLUMNS.BLOG_POSTS;
    const BC = COLUMNS.BLOG_CONTENT;

    // Parse posts (skip header row, filter published only)
    const posts = postsRows
      .slice(1)
      .filter((row) => row && row.length > 0 && row[BP.SLUG] && parseBool(row[BP.PUBLISHED]))
      .map((row) => ({
        slug:       row[BP.SLUG]        || '',
        title:      row[BP.TITLE]       || '',
        category:   row[BP.CATEGORY]    || '',
        date:       row[BP.DATE]        || '',
        readTime:   row[BP.READ_TIME]   || '',
        author: {
          name: row[BP.AUTHOR_NAME] || '',
          role: row[BP.AUTHOR_ROLE] || '',
        },
        thumbnail:  row[BP.THUMBNAIL]   || '',
        heroImage:  row[BP.HERO_IMAGE]  || '',
        excerpt:    row[BP.EXCERPT]     || '',
        tags:       (row[BP.TAGS] || '').split(',').map((t) => t.trim()).filter(Boolean),
        featured:   parseBool(row[BP.FEATURED]),
      }));

    console.log(`📝 Parsed ${posts.length} published post(s)`);

    // Parse content rows (skip header), group by slug, sort by order
    const contentBySlug = {};
    contentRows
      .slice(1)
      .filter((row) => row && row.length > 0 && row[BC.SLUG])
      .forEach((row) => {
        const slug = row[BC.SLUG];
        if (!contentBySlug[slug]) contentBySlug[slug] = [];
        contentBySlug[slug].push({
          order: parseInt(row[BC.ORDER]) || 0,
          type:  row[BC.TYPE]  || 'paragraph',
          text:  row[BC.TEXT]  || '',
          value: row[BC.VALUE] || '',
          label: row[BC.LABEL] || '',
        });
      });

    // Sort content blocks and attach to posts
    const blogPosts = posts.map((post) => {
      const blocks = (contentBySlug[post.slug] || [])
        .sort((a, b) => a.order - b.order)
        .map(({ type, text, value, label }) => {
          if (type === 'stat') return { type, value, label };
          return { type, text };
        });
      return { ...post, content: blocks };
    });

    // Derive categories
    const uniqueCategories = [...new Set(blogPosts.map((p) => p.category).filter(Boolean))];
    const blogCategories = ['All', ...uniqueCategories];

    console.log('📝 Generating blog.js...');
    const jsContent = generateBlogJS(blogPosts, blogCategories);

    fs.writeFileSync(OUTPUT_PATH, jsContent, 'utf-8');
    console.log(`✅ Blog file generated: ${OUTPUT_PATH}`);
    console.log(`   Total posts: ${blogPosts.length}`);
    console.log(`   Categories: ${blogCategories.join(', ')}`);

  } catch (error) {
    console.error('❌ Failed to fetch and generate blog:', error.message);
    process.exit(1);
  }
}

// ─── JavaScript Generator ────────────────────────────────────────────────────

function generateBlogJS(blogPosts, blogCategories) {
  return `// AUTO-GENERATED — do not edit manually.
// Update via Google Sheets and run: npm run fetch-blog

export const blogPosts = ${JSON.stringify(blogPosts, null, 2)};

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null;
}

export function getFeaturedPost() {
  return blogPosts.find((post) => post.featured) || blogPosts[0];
}

export const blogCategories = ${JSON.stringify(blogCategories)};
`;
}

// ─── Run ─────────────────────────────────────────────────────────────────────

fetchAndGenerateBlog();
