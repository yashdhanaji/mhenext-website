# MHE Next — Content Management Guide

This document explains how to add, edit, and remove content on the MHE Next website without touching any code. All content lives in a Google Sheet; a simple terminal command publishes your changes to the site.

---

## How It Works (Big Picture)

There are **two separate Google Spreadsheets**:

| Spreadsheet | Env variable | Manages |
|---|---|---|
| **Products Sheet** | `GOOGLE_SHEET_ID` | All product catalog data |
| **Blog Sheet** | `GOOGLE_BLOG_SHEET_ID` | All blog posts and content |

```
Blog Sheet     →  npm run fetch-blog      →  src/data/blog.js   →  Website
Products Sheet →  npm run fetch-products  →  src/data/products.js →  Website
```

1. You edit the relevant Google Sheet (add rows, update text, toggle published).
2. You run one command in the terminal.
3. The website data file is regenerated and the changes go live on the next build/deploy.

---

## Table of Contents

1. [Initial Setup (one-time)](#1-initial-setup-one-time)
2. [Blog CMS](#2-blog-cms)
   - [Google Sheet structure](#google-sheet-structure)
   - [Add a new blog post](#add-a-new-blog-post)
   - [Edit an existing post](#edit-an-existing-post)
   - [Unpublish / hide a post](#unpublish--hide-a-post)
   - [Delete a post permanently](#delete-a-post-permanently)
3. [Products CMS](#3-products-cms)
4. [Publishing changes to the site](#4-publishing-changes-to-the-site)
5. [Troubleshooting](#5-troubleshooting)

---

## 1. Initial Setup (one-time)

> **Skip this section if the Google Sheet already has `BlogPosts` and `BlogContent` tabs.**

### Step 1 — Export the existing blog data to CSV

Open a terminal in the project folder and run:

```bash
node scripts/migrate-blog-to-sheets.js
```

This creates two files inside `migration-output/`:

| File | What it contains |
|---|---|
| `blog-posts.csv` | One row per blog post (metadata) |
| `blog-content.csv` | One row per content block (paragraphs, headings, stats) |

### Step 2 — Create the sheet tabs

> The blog tabs live in a **brand new, separate spreadsheet** — not the Products one. This keeps editorial and product data cleanly separated.

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet. Name it something like **"MHE Next — Blog CMS"**.
2. Copy its **Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`
3. Add that ID to your `.env` file as `GOOGLE_BLOG_SHEET_ID=paste_id_here`.
4. In the new spreadsheet, rename the default tab to **`BlogPosts`**.
5. Add a second tab named **`BlogContent`**.

### Step 3 — Import the CSV data

**For BlogPosts tab:**
1. Click cell **A1**.
2. Go to **File → Import → Upload** and select `migration-output/blog-posts.csv`.
3. Choose **"Replace data at selected cell"** and import.

**For BlogContent tab:**
1. Click cell **A1** in the BlogContent tab.
2. Same process — import `migration-output/blog-content.csv`.

### Step 4 — Verify the import

The `BlogPosts` tab should look like this (row 1 is the header):

| A (slug) | B (title) | C (category) | … | M (published) |
|---|---|---|---|---|
| `future-of-electric-forklifts-india` | The future of electric… | Industry Insights | … | TRUE |

### Step 5 — Test the fetch

```bash
npm run fetch-blog
```

You should see:
```
✅ Blog file generated: src/data/blog.js
   Total posts: 6
```

---

## 2. Blog CMS

The blog uses **two sheet tabs** that work together:

| Tab | Purpose |
|---|---|
| `BlogPosts` | One row = one blog post (title, date, author, etc.) |
| `BlogContent` | One row = one content block inside a post (paragraph, heading, or stat) |

### Google Sheet Structure

#### `BlogPosts` tab — columns A to M

| Col | Name | Example | Notes |
|---|---|---|---|
| A | `slug` | `my-new-post` | URL-friendly ID. Use lowercase, hyphens only. Must be unique. |
| B | `title` | `Why Electric Forklifts Win` | The post's headline. |
| C | `category` | `Industry Insights` | Used for filter buttons on the blog page. |
| D | `date` | `February 17, 2025` | Displayed on the post card. |
| E | `readTime` | `5 min read` | Shown on cards and the post page. |
| F | `authorName` | `Arjun Mehta` | Author's full name. |
| G | `authorRole` | `Head of Product` | Author's job title. |
| H | `thumbnail` | `https://…` | Image shown on the blog listing card (600px wide). |
| I | `heroImage` | `https://…` | Large image at the top of the post page (1200px wide). |
| J | `excerpt` | `A short summary…` | 1–2 sentences shown on the card and in the post intro. |
| K | `tags` | `Electric,India,Sustainability` | Comma-separated. No spaces around commas. |
| L | `featured` | `TRUE` | Only one post should be `TRUE` — it's highlighted on the blog page. |
| M | `published` | `TRUE` | Set to `FALSE` to hide the post without deleting it. |

#### `BlogContent` tab — columns A to F

| Col | Name | Example | Notes |
|---|---|---|---|
| A | `slug` | `my-new-post` | Must exactly match the slug in `BlogPosts`. |
| B | `order` | `1` | Integer. Blocks render in ascending order. |
| C | `type` | `paragraph` | One of: `paragraph`, `heading`, `stat` |
| D | `text` | `Electric forklifts…` | Fill this for `paragraph` and `heading` types. Leave blank for `stat`. |
| E | `value` | `3x` | Fill this for `stat` type only. |
| F | `label` | `Growth in adoption` | Fill this for `stat` type only. |

**Content type quick reference:**

| type | What it renders | Columns to fill |
|---|---|---|
| `paragraph` | A body-text paragraph | D (text) |
| `heading` | A bold section heading | D (text) |
| `stat` | A large number with a label (e.g. "3x — Growth in…") | E (value) + F (label) |

---

### Add a New Blog Post

#### Part 1 — Add the post metadata (BlogPosts tab)

1. Open the `BlogPosts` tab.
2. Scroll to the **first empty row** below the existing data.
3. Fill in all 13 columns (A through M).
4. Set column M (`published`) to **`FALSE`** while you're still writing — flip to `TRUE` when ready.

**Example row:**

```
slug:        cold-chain-logistics-guide
title:       The complete guide to cold chain logistics
category:    Technical Guides
date:        February 17, 2025
readTime:    7 min read
authorName:  Priya Nair
authorRole:  Service Manager
thumbnail:   https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80
heroImage:   https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80
excerpt:     Cold chain warehouses have unique forklift requirements…
tags:        Cold Chain,Technical,Pharma
featured:    FALSE
published:   TRUE
```

#### Part 2 — Add the post content (BlogContent tab)

1. Switch to the `BlogContent` tab.
2. Add one row per content block for your new post.
3. Use the `order` column (1, 2, 3…) to control the sequence.

**Example rows for the post above:**

| slug | order | type | text | value | label |
|---|---|---|---|---|---|
| `cold-chain-logistics-guide` | 1 | paragraph | Cold chain warehouses have unique forklift requirements… | | |
| `cold-chain-logistics-guide` | 2 | heading | Why standard forklifts fail in cold storage | | |
| `cold-chain-logistics-guide` | 3 | paragraph | At temperatures below -18°C, standard… | | |
| `cold-chain-logistics-guide` | 4 | stat | | -25°C | Lowest rated operating temperature for our cold-spec fleet |
| `cold-chain-logistics-guide` | 5 | heading | Key equipment specifications | | |
| `cold-chain-logistics-guide` | 6 | paragraph | When selecting equipment for cold storage… | | |

#### Part 3 — Publish

Run this command in the terminal:

```bash
npm run fetch-blog
```

Then start the dev server to preview:

```bash
npm run dev
```

Navigate to `http://localhost:5173/blog` to see your new post.

---

### Edit an Existing Post

**To change metadata** (title, date, excerpt, etc.):
1. Find the row in the `BlogPosts` tab.
2. Edit the relevant cell(s).
3. Run `npm run fetch-blog`.

**To edit body content** (text, headings, stats):
1. Find the rows in `BlogContent` where column A matches the post slug.
2. Edit the `text`, `value`, or `label` cells.
3. To reorder blocks, change the numbers in column B (`order`).
4. Run `npm run fetch-blog`.

**To add a new section** to an existing post:
1. Add a new row in `BlogContent` with the post's slug and the next `order` number.
2. Run `npm run fetch-blog`.

---

### Unpublish / Hide a Post

1. In the `BlogPosts` tab, find the post row.
2. Change column M (`published`) from `TRUE` to **`FALSE`**.
3. Run `npm run fetch-blog`.

The post will no longer appear on the site but all its data is preserved in the sheet.

---

### Delete a Post Permanently

1. In `BlogPosts`, delete the entire row for that post.
2. In `BlogContent`, delete **all rows** where column A matches the post's slug.
3. Run `npm run fetch-blog`.

> **Tip:** Instead of deleting, consider unpublishing (see above). It's reversible.

---

## 3. Products CMS

Products follow the same pattern as Blog but use a **separate spreadsheet** (configured via `GOOGLE_SHEET_ID`). It has many tabs for the richer product data:

| Tab | Purpose |
|---|---|
| `Products` | One row per product |
| `Images` | Product gallery images |
| `QuickSpecs`, `Specs`, `FullSpecs` | Specification data |
| `Features`, `FullFeatures` | Feature lists |
| `Applications`, `FullApplications` | Application use cases |
| `Downloads` | Brochure / datasheet links |
| `RelatedProducts` | Cross-links between products |

To publish product changes:

```bash
npm run fetch-products
```

Both blog and products are fetched automatically when you run `npm run dev` or `npm run build`.

---

## 4. Publishing Changes to the Site

### During development (local preview)

```bash
npm run fetch-blog       # regenerate blog data only
npm run fetch-products   # regenerate products data only
npm run dev              # fetches both + starts local server
```

### For a production build

```bash
npm run build
```

This automatically runs both fetch scripts before building. The generated `dist/` folder is what gets deployed.

---

## 5. Troubleshooting

### "GOOGLE_API_KEY environment variable is not set" / "GOOGLE_BLOG_SHEET_ID is not configured"

You need a `.env` file in the project root. Ask a developer for the file, or create one with all three values:

```
GOOGLE_API_KEY=your_api_key_here
GOOGLE_SHEET_ID=your_products_sheet_id_here
GOOGLE_BLOG_SHEET_ID=your_blog_sheet_id_here
```

The Sheet ID is the long string in the Google Sheet URL:
`https://docs.google.com/spreadsheets/d/`**`THIS_IS_THE_ID`**`/edit`

### "Error fetching range BlogPosts!A:M"

The sheet tab name is case-sensitive. Make sure the tab is named exactly `BlogPosts` (no spaces, capital B and P).

### A post is not appearing on the site

Check these in order:
1. Column M (`published`) — must be `TRUE` (exactly, not `true` or `Yes`).
2. Column A (`slug`) — must not be blank.
3. Did you run `npm run fetch-blog` after making the change?
4. Did you save the Google Sheet? (It auto-saves, but check the title bar for "Saving…")

### Content blocks are in the wrong order

Check column B (`order`) in the `BlogContent` tab for that post's rows. The numbers must be unique integers starting at 1. Gaps are fine (1, 2, 5, 10 is valid).

### The featured post is not showing correctly

Only **one** post should have column L (`featured`) set to `TRUE`. If multiple posts are marked as featured, the first one in the sheet wins. Set all others to `FALSE`.

### Changes to the sheet are not reflected after running fetch

The fetch script reads live data from the Google Sheet API. If you edited the sheet just moments ago, wait a few seconds and run the command again — the API can have a brief sync delay.

---

## Quick Reference Card

| Task | Sheet tab | Command to run after |
|---|---|---|
| Add a blog post | `BlogPosts` + `BlogContent` | `npm run fetch-blog` |
| Edit a blog post | `BlogPosts` or `BlogContent` | `npm run fetch-blog` |
| Hide a blog post | `BlogPosts` col M → `FALSE` | `npm run fetch-blog` |
| Add a product | `Products` + related tabs | `npm run fetch-products` |
| Edit a product | relevant product tabs | `npm run fetch-products` |
| Full site rebuild | — | `npm run build` |
