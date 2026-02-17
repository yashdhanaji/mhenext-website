#!/usr/bin/env node

/**
 * Admin API Server
 *
 * Express server providing CRUD endpoints for Blog, Case Studies, and
 * read-only Products. Uses a Google Service Account for write access.
 *
 * Runs on port 3001. The Vite dev server proxies /api → http://localhost:3001
 *
 * Setup:
 *   1. Place service-account.json in the project root (add to .gitignore)
 *   2. Share both Google Sheets with the service account email (Editor role)
 *   3. Run: node scripts/admin-server.js  (or npm run admin)
 */

import 'dotenv/config';
import express from 'express';
import { google } from 'googleapis';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SHEET_ID,
  BLOG_SHEET_ID,
  CASE_STUDIES_SHEET_ID,
  SHEETS,
  COLUMNS,
} from './sheets-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execAsync = promisify(exec);

// ─── Auth ─────────────────────────────────────────────────────────────────────

const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../service-account.json');

function createAuth() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    return new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }
  if (fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    return new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }
  console.warn('⚠️  No service account found. Write operations will fail.');
  console.warn('   Place service-account.json in the project root, or set GOOGLE_SERVICE_ACCOUNT_KEY env var.');
  return null;
}

const auth = createAuth();
const sheets = google.sheets({ version: 'v4', auth: auth || undefined });

// For read-only operations, fall back to API key
const API_KEY = process.env.GOOGLE_API_KEY;
const sheetsReadOnly = google.sheets({ version: 'v4', auth: API_KEY });

// ─── App ──────────────────────────────────────────────────────────────────────

const app = express();
app.use(express.json({ limit: '2mb' }));

// CORS for local dev
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ─── Sheet Helpers ────────────────────────────────────────────────────────────

async function readRange(spreadsheetId, range, useAuth = false) {
  const client = useAuth ? sheets : sheetsReadOnly;
  const res = await client.spreadsheets.values.get({ spreadsheetId, range });
  return res.data.values || [];
}

async function appendRows(spreadsheetId, range, values) {
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values },
  });
  return res.data;
}

async function updateRow(spreadsheetId, range, values) {
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
  return res.data;
}

/**
 * Delete rows by matching a value in a specific column.
 * Rows are deleted in descending order to avoid index shifting.
 */
async function deleteRowsBySlug(spreadsheetId, sheetName, slugColumnIndex, slug) {
  // First get the sheet ID (gid)
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetMeta = meta.data.sheets.find((s) => s.properties.title === sheetName);
  if (!sheetMeta) throw new Error(`Sheet "${sheetName}" not found`);
  const sheetId = sheetMeta.properties.sheetId;

  // Fetch all rows
  const rows = await readRange(spreadsheetId, `${sheetName}!A:A`, true);
  const indicesToDelete = [];
  rows.forEach((row, i) => {
    if (i === 0) return; // skip header
    if (row[slugColumnIndex] === slug || (slugColumnIndex === 0 && row[0] === slug)) {
      indicesToDelete.push(i); // 0-indexed row number (header is 0)
    }
  });

  if (indicesToDelete.length === 0) return 0;

  // Delete in descending order
  const requests = indicesToDelete
    .sort((a, b) => b - a)
    .map((rowIndex) => ({
      deleteDimension: {
        range: {
          sheetId,
          dimension: 'ROWS',
          startIndex: rowIndex,
          endIndex: rowIndex + 1,
        },
      },
    }));

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests },
  });

  return indicesToDelete.length;
}

/**
 * Find a row index (0-based, including header) by slug in column 0.
 * Returns -1 if not found.
 */
async function findRowIndexBySlug(spreadsheetId, range, slug) {
  const rows = await readRange(spreadsheetId, range, true);
  return rows.findIndex((row, i) => i > 0 && row[0] === slug);
}

// ─── Blog Routes ──────────────────────────────────────────────────────────────

const BP = COLUMNS.BLOG_POSTS;
const BC = COLUMNS.BLOG_CONTENT;

// GET /api/blog — all posts (including unpublished for admin)
app.get('/api/blog', async (req, res) => {
  try {
    const [postsRows, contentRows] = await Promise.all([
      readRange(BLOG_SHEET_ID, SHEETS.BLOG_POSTS, !!auth),
      readRange(BLOG_SHEET_ID, SHEETS.BLOG_CONTENT, !!auth),
    ]);

    const contentBySlug = {};
    contentRows.slice(1).filter((r) => r && r[BC.SLUG]).forEach((row) => {
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

    const posts = postsRows.slice(1).filter((r) => r && r[BP.SLUG]).map((row) => ({
      slug:       row[BP.SLUG]        || '',
      title:      row[BP.TITLE]       || '',
      category:   row[BP.CATEGORY]    || '',
      date:       row[BP.DATE]        || '',
      readTime:   row[BP.READ_TIME]   || '',
      authorName: row[BP.AUTHOR_NAME] || '',
      authorRole: row[BP.AUTHOR_ROLE] || '',
      thumbnail:  row[BP.THUMBNAIL]   || '',
      heroImage:  row[BP.HERO_IMAGE]  || '',
      excerpt:    row[BP.EXCERPT]     || '',
      tags:       row[BP.TAGS]        || '',
      featured:   row[BP.FEATURED]    || 'FALSE',
      published:  row[BP.PUBLISHED]   || 'FALSE',
      content: (contentBySlug[row[BP.SLUG]] || [])
        .sort((a, b) => a.order - b.order)
        .map(({ type, text, value, label }) =>
          type === 'stat' ? { type, value, label } : { type, text }
        ),
    }));

    res.json({ posts });
  } catch (err) {
    console.error('GET /api/blog error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/blog — create new post
app.post('/api/blog', async (req, res) => {
  try {
    const { post, content = [] } = req.body;
    const postRow = [
      post.slug, post.title, post.category, post.date, post.readTime,
      post.authorName, post.authorRole, post.thumbnail, post.heroImage,
      post.excerpt, post.tags, post.featured || 'FALSE', post.published || 'FALSE',
    ];
    await appendRows(BLOG_SHEET_ID, SHEETS.BLOG_POSTS, [postRow]);

    if (content.length > 0) {
      const contentRows = content.map((block, i) => [
        post.slug, i + 1, block.type, block.text || '', block.value || '', block.label || '',
      ]);
      await appendRows(BLOG_SHEET_ID, SHEETS.BLOG_CONTENT, contentRows);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/blog error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/blog/:slug — update existing post
app.put('/api/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { post, content = [] } = req.body;

    // Find the post row index
    const rowIdx = await findRowIndexBySlug(BLOG_SHEET_ID, SHEETS.BLOG_POSTS, slug);
    if (rowIdx === -1) return res.status(404).json({ error: 'Post not found' });

    const sheetRow = rowIdx + 1; // 1-indexed for Sheets API
    const range = `BlogPosts!A${sheetRow}:M${sheetRow}`;
    const postRow = [
      post.slug, post.title, post.category, post.date, post.readTime,
      post.authorName, post.authorRole, post.thumbnail, post.heroImage,
      post.excerpt, post.tags, post.featured || 'FALSE', post.published || 'FALSE',
    ];
    await updateRow(BLOG_SHEET_ID, range, [postRow]);

    // Replace all content rows for this slug
    await deleteRowsBySlug(BLOG_SHEET_ID, 'BlogContent', 0, slug);
    if (content.length > 0) {
      const contentRows = content.map((block, i) => [
        post.slug, i + 1, block.type, block.text || '', block.value || '', block.label || '',
      ]);
      await appendRows(BLOG_SHEET_ID, SHEETS.BLOG_CONTENT, contentRows);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('PUT /api/blog/:slug error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/blog/:slug — delete post and its content
app.delete('/api/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    await Promise.all([
      deleteRowsBySlug(BLOG_SHEET_ID, 'BlogPosts', 0, slug),
      deleteRowsBySlug(BLOG_SHEET_ID, 'BlogContent', 0, slug),
    ]);
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/blog/:slug error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Case Studies Routes ──────────────────────────────────────────────────────

const CS = COLUMNS.CASE_STUDIES;
const SS = COLUMNS.CASE_STUDY_STATS;

// GET /api/case-studies
app.get('/api/case-studies', async (req, res) => {
  try {
    const [csRows, statsRows] = await Promise.all([
      readRange(CASE_STUDIES_SHEET_ID, SHEETS.CASE_STUDIES, !!auth),
      readRange(CASE_STUDIES_SHEET_ID, SHEETS.CASE_STUDY_STATS, !!auth),
    ]);

    const statsBySlug = {};
    statsRows.slice(1).filter((r) => r && r[SS.SLUG]).forEach((row) => {
      const slug = row[SS.SLUG];
      if (!statsBySlug[slug]) statsBySlug[slug] = [];
      statsBySlug[slug].push({
        order: parseInt(row[SS.ORDER]) || 0,
        value: row[SS.VALUE] || '',
        label: row[SS.LABEL] || '',
      });
    });

    const caseStudies = csRows.slice(1).filter((r) => r && r[CS.SLUG]).map((row) => ({
      slug:      row[CS.SLUG]       || '',
      title:     row[CS.TITLE]      || '',
      client:    row[CS.CLIENT]     || '',
      industry:  row[CS.INDUSTRY]   || '',
      location:  row[CS.LOCATION]   || '',
      duration:  row[CS.DURATION]   || '',
      year:      row[CS.YEAR]       || '',
      thumbnail: row[CS.THUMBNAIL]  || '',
      heroImage: row[CS.HERO_IMAGE] || '',
      gallery:   row[CS.GALLERY]    || '',
      excerpt:   row[CS.EXCERPT]    || '',
      tags:      row[CS.TAGS]       || '',
      equipment: row[CS.EQUIPMENT]  || '',
      challenge: row[CS.CHALLENGE]  || '',
      solution:  row[CS.SOLUTION]   || '',
      results:   row[CS.RESULTS]    || '',
      published: row[CS.PUBLISHED]  || 'FALSE',
      stats: (statsBySlug[row[CS.SLUG]] || [])
        .sort((a, b) => a.order - b.order)
        .map(({ value, label }) => ({ value, label })),
    }));

    res.json({ caseStudies });
  } catch (err) {
    console.error('GET /api/case-studies error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/case-studies
app.post('/api/case-studies', async (req, res) => {
  try {
    const { caseStudy, stats = [] } = req.body;
    const csRow = [
      caseStudy.slug, caseStudy.title, caseStudy.client, caseStudy.industry,
      caseStudy.location, caseStudy.duration, caseStudy.year, caseStudy.thumbnail,
      caseStudy.heroImage, caseStudy.gallery, caseStudy.excerpt, caseStudy.tags,
      caseStudy.equipment, caseStudy.challenge, caseStudy.solution,
      caseStudy.results, caseStudy.published || 'FALSE',
    ];
    await appendRows(CASE_STUDIES_SHEET_ID, SHEETS.CASE_STUDIES, [csRow]);

    if (stats.length > 0) {
      const statsRows = stats.map((stat, i) => [caseStudy.slug, stat.value, stat.label, i + 1]);
      await appendRows(CASE_STUDIES_SHEET_ID, SHEETS.CASE_STUDY_STATS, statsRows);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/case-studies error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/case-studies/:slug
app.put('/api/case-studies/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { caseStudy, stats = [] } = req.body;

    const rowIdx = await findRowIndexBySlug(CASE_STUDIES_SHEET_ID, SHEETS.CASE_STUDIES, slug);
    if (rowIdx === -1) return res.status(404).json({ error: 'Case study not found' });

    const sheetRow = rowIdx + 1;
    const range = `CaseStudies!A${sheetRow}:Q${sheetRow}`;
    const csRow = [
      caseStudy.slug, caseStudy.title, caseStudy.client, caseStudy.industry,
      caseStudy.location, caseStudy.duration, caseStudy.year, caseStudy.thumbnail,
      caseStudy.heroImage, caseStudy.gallery, caseStudy.excerpt, caseStudy.tags,
      caseStudy.equipment, caseStudy.challenge, caseStudy.solution,
      caseStudy.results, caseStudy.published || 'FALSE',
    ];
    await updateRow(CASE_STUDIES_SHEET_ID, range, [csRow]);

    await deleteRowsBySlug(CASE_STUDIES_SHEET_ID, 'CaseStudyStats', 0, slug);
    if (stats.length > 0) {
      const statsRows = stats.map((stat, i) => [caseStudy.slug, stat.value, stat.label, i + 1]);
      await appendRows(CASE_STUDIES_SHEET_ID, SHEETS.CASE_STUDY_STATS, statsRows);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('PUT /api/case-studies/:slug error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/case-studies/:slug
app.delete('/api/case-studies/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    await Promise.all([
      deleteRowsBySlug(CASE_STUDIES_SHEET_ID, 'CaseStudies', 0, slug),
      deleteRowsBySlug(CASE_STUDIES_SHEET_ID, 'CaseStudyStats', 0, slug),
    ]);
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/case-studies/:slug error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Products Routes (read-only) ──────────────────────────────────────────────

app.get('/api/products', async (req, res) => {
  try {
    const rows = await readRange(SHEET_ID, SHEETS.PRODUCTS, !!auth);
    const P = COLUMNS.PRODUCTS;
    const products = rows.slice(1).filter((r) => r && r[P.slug]).map((row) => ({
      slug:      row[P.slug]      || '',
      name:      row[P.name]      || '',
      category:  row[P.category]  || '',
      eyebrow:   row[P.eyebrow]   || '',
      shortDesc: row[P.shortDesc] || '',
    }));
    res.json({ products });
  } catch (err) {
    console.error('GET /api/products error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Sync Route ───────────────────────────────────────────────────────────────

app.post('/api/sync', async (req, res) => {
  try {
    console.log('🔄 Running sync...');
    const { stdout, stderr } = await execAsync(
      'node scripts/fetch-products.js && node scripts/fetch-blog.js && node scripts/fetch-case-studies.js',
      { cwd: path.join(__dirname, '..') }
    );
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    res.json({ ok: true, output: stdout });
  } catch (err) {
    console.error('POST /api/sync error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────

const PORT = process.env.ADMIN_PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Admin API server running on http://localhost:${PORT}`);
  console.log('   Endpoints:');
  console.log('   GET|POST|PUT|DELETE /api/blog');
  console.log('   GET|POST|PUT|DELETE /api/case-studies');
  console.log('   GET /api/products');
  console.log('   POST /api/sync');
});
