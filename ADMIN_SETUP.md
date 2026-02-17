# Admin CMS Panel — Setup Guide

The admin panel lets you create, edit, and delete blog posts and case studies directly from the browser at `http://localhost:5173/admin`, with changes going straight to Google Sheets. No spreadsheet editing required.

## How It Works

```
Browser (/admin)  →  Vite proxy (/api)  →  Express server (port 3001)  →  Google Sheets API
```

- The admin UI is a React app inside the existing Vite project
- A small Express server (`scripts/admin-server.js`) handles all Google Sheets reads and writes
- Writes use a **service account** (not your personal Google account) — this is required for edit access
- `npm run admin` starts both the Express server and Vite together

---

## What the Admin Can Do

| Section | Create | Edit | Delete | Publish Toggle |
|---|---|---|---|---|
| Blog Posts | ✅ | ✅ | ✅ | ✅ |
| Case Studies | ✅ | ✅ | ✅ | ✅ |
| Products | — | — | — | — |

Products are read-only in the admin. Edit them directly in the Products Google Sheet and use the **Sync Data Files** button to regenerate the local data file.

---

## Prerequisites

Before starting, make sure you have:

- The project dependencies installed (`npm install`)
- A working `.env` file with `GOOGLE_SHEET_ID`, `GOOGLE_API_KEY`, and `GOOGLE_BLOG_SHEET_ID` already configured (see `SHEETS_SETUP.md` if not)
- A Google Cloud project with the **Google Sheets API** enabled

---

## Step 1: Create a Service Account

The admin needs write access to Google Sheets, which requires a service account (an API key is read-only).

### 1.1 — Open Google Cloud Console

Go to the project you created when setting up the products sheet:
[https://console.cloud.google.com/](https://console.cloud.google.com/)

Make sure the correct project is selected in the top dropdown.

### 1.2 — Navigate to Service Accounts

1. In the left sidebar, go to **IAM & Admin → Service Accounts**
2. Or go directly to: [https://console.cloud.google.com/iam-admin/serviceaccounts](https://console.cloud.google.com/iam-admin/serviceaccounts)

### 1.3 — Create a Service Account

1. Click **+ Create Service Account**
2. Fill in the details:
   - **Name:** `mhe-next-admin` (or any name)
   - **ID:** auto-fills from the name
   - **Description:** `Admin write access for MHE Next CMS`
3. Click **Create and Continue**
4. On the "Grant this service account access" step, skip it (no role needed here)
5. Click **Done**

### 1.4 — Download the JSON Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key → Create new key**
4. Select **JSON** and click **Create**
5. A `.json` file downloads automatically — this is your service account key

### 1.5 — Place the Key in the Project

1. Rename the downloaded file to **`service-account.json`**
2. Move it to the **project root** (same folder as `package.json`)

```
mhenext-website/
├── service-account.json   ← place it here
├── package.json
├── .env
└── ...
```

> **Security:** `service-account.json` is already in `.gitignore` — it will never be committed. Never share this file or upload it to GitHub.

---

## Step 2: Set Up the Case Studies Sheet

Case studies need their own Google Sheet (separate from products and blog). If you already have one, skip to Step 3.

### 2.1 — Export Existing Case Studies to CSV

The existing case studies are hardcoded in `src/data/caseStudies.js`. Run the migration script to export them:

```bash
npm run migrate-case-studies
```

This creates two files in `migration-output/`:
- `case-studies.csv` — the main case study data
- `case-study-stats.csv` — the stats (60%, 35%, etc.) for each case study

### 2.2 — Create a New Google Sheet

1. Go to [https://sheets.google.com/](https://sheets.google.com/)
2. Click **Blank** to create a new spreadsheet
3. Name it **"MHE Next — Case Studies"**

### 2.3 — Create the Required Tabs

You need **two tabs**. Rename the default "Sheet1" tab and add a second:

| Tab Name | Purpose |
|---|---|
| `CaseStudies` | One row per case study |
| `CaseStudyStats` | Stats rows (value + label) linked to each case study |

To rename a tab: double-click the tab name at the bottom.
To add a tab: click the **+** button at the bottom left.

> Tab names are **case-sensitive**. They must match exactly as shown above.

### 2.4 — Import the CSV Files

**Import `case-studies.csv` into the `CaseStudies` tab:**
1. Select the **CaseStudies** tab
2. Go to **File → Import → Upload**
3. Select `migration-output/case-studies.csv`
4. Set **Import location** to "Replace current sheet"
5. Set **Separator type** to "Detect automatically"
6. Click **Import data**

**Import `case-study-stats.csv` into the `CaseStudyStats` tab:**
1. Select the **CaseStudyStats** tab
2. Repeat the import steps with `migration-output/case-study-stats.csv`

### 2.5 — Get the Sheet ID

Copy the Sheet ID from the URL:

```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
                                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                       this part is your Sheet ID
```

---

## Step 3: Share All Three Sheets with the Service Account

The service account needs **Editor** access to every sheet the admin writes to.

### Find the service account email

Open `service-account.json` and look for the `client_email` field:

```json
{
  "client_email": "mhe-next-admin@your-project.iam.gserviceaccount.com",
  ...
}
```

Copy that email address.

### Share each sheet

Repeat this for **all three sheets** — Products, Blog, and Case Studies:

1. Open the Google Sheet
2. Click the **Share** button (top right)
3. Paste the service account email into the "Add people" field
4. Set the role to **Editor**
5. **Uncheck** "Notify people" (the service account can't receive emails)
6. Click **Share**

---

## Step 4: Update Your .env File

Open `.env` in the project root and add the Case Studies sheet ID:

```env
# Existing variables (already set)
GOOGLE_API_KEY=your_api_key_here
GOOGLE_SHEET_ID=your_products_sheet_id
GOOGLE_BLOG_SHEET_ID=your_blog_sheet_id

# New — add this line
GOOGLE_CASE_STUDIES_SHEET_ID=paste_your_case_studies_sheet_id_here
```

Save the file.

---

## Step 5: Verify the Setup

Run the case studies fetch script to confirm the new sheet is wired up correctly:

```bash
npm run fetch-case-studies
```

You should see:

```
🔄 Fetching case studies from Google Sheets...
   Case Studies Sheet ID: 1BxiMVs0XRA5...
✅ Data fetched successfully
📝 Parsed 4 published case study/studies
✅ Case studies file generated: .../src/data/caseStudies.js
```

If you see errors, check the troubleshooting section at the bottom of this guide.

---

## Step 6: Start the Admin Panel

```bash
npm run admin
```

This runs two processes in parallel:
1. `node scripts/admin-server.js` — the Express API on port 3001
2. `vite` — the Vite dev server on port 5173

You should see output like:

```
[0] ✅ Admin API server running on http://localhost:3001
[1] VITE v7.x.x  ready in xxx ms
[1] ➜  Local: http://localhost:5173/
```

Open your browser and go to: **[http://localhost:5173/admin](http://localhost:5173/admin)**

---

## Step 7: First-Time Sync

Once the admin is open, click **Sync Data Files** in the left sidebar. This runs all three fetch scripts and regenerates:
- `src/data/products.js`
- `src/data/blog.js`
- `src/data/caseStudies.js`

You should see the button turn green with a "Synced!" confirmation.

---

## Using the Admin

### Dashboard

The dashboard shows a live count of posts, case studies, and products pulled directly from Google Sheets.

### Blog Posts

**Viewing posts:**
- Go to **Blog** in the sidebar
- All posts are listed, including unpublished drafts
- The "Live / Draft" badge shows the published state — click it to toggle instantly

**Creating a post:**
1. Click **New Post**
2. Fill in the slug first — it becomes the URL (`/blog/your-slug`) and cannot be changed after saving
3. Fill in the metadata fields
4. Add content blocks at the bottom:
   - **Paragraph** — body text
   - **Heading** — section heading
   - **Stat** — a value + label pair (e.g. "60%" / "Increase in speed")
5. Use the up/down arrows to reorder blocks
6. Toggle **Published** on when ready
7. Click **Save Post**

**Editing a post:**
- Click the pencil icon on any post in the list
- Make changes and click **Save Post**

**Deleting a post:**
- Click the trash icon on any post in the list
- Confirm the deletion — this removes the row from Google Sheets permanently

### Case Studies

Works the same as blog posts. Additional fields include:
- **Gallery** — comma-separated image URLs
- **Tags** and **Equipment** — comma-separated values
- **Results** — one result per line in the textarea
- **Stats** — editable table of value + label pairs (e.g. "60%" / "Increase in order speed")

### Products

Products are **read-only** in the admin. To update a product:
1. Edit it directly in your Products Google Sheet
2. Return to the admin and click **Sync Data Files**

### Sync Data Files

The **Sync Data Files** button in the sidebar runs:
```
npm run fetch-products && npm run fetch-blog && npm run fetch-case-studies
```

This regenerates all three `src/data/` files from the current sheet data. Always sync after making changes in the admin before running a production build — changes saved to Sheets won't appear on the site until the data files are regenerated.

---

## Daily Workflow

```
1. npm run admin          — start the admin + dev server
2. Go to /admin           — open the admin panel
3. Edit content           — create/edit/delete posts or case studies
4. Click "Sync Data Files" — regenerate the local data files
5. Verify on /blog or /case-studies that the changes look right
6. npm run build          — production build (auto-syncs from Sheets)
7. Deploy dist/           — deploy to hosting
```

---

## Sheet Structure Reference

### CaseStudies tab (`CaseStudies!A:Q`)

| Column | Field | Example |
|---|---|---|
| A | slug | `ecommerce-fulfillment-automation` |
| B | title | `E-commerce fulfillment center automation` |
| C | client | `FlipMart Logistics` |
| D | industry | `E-commerce` |
| E | location | `Mumbai, India` |
| F | duration | `6 months` |
| G | year | `2024` |
| H | thumbnail | `https://images.unsplash.com/…` |
| I | heroImage | `https://images.unsplash.com/…` |
| J | gallery | `https://…, https://…` (comma-separated) |
| K | excerpt | Short summary shown on listing page |
| L | tags | `E-commerce, Automation` (comma-separated) |
| M | equipment | `Electric Forklift 2T, Three Wheel…` (comma-separated) |
| N | challenge | Long-form text |
| O | solution | Long-form text |
| P | results | One result per line (newline-separated) |
| Q | published | `TRUE` or `FALSE` |

### CaseStudyStats tab (`CaseStudyStats!A:D`)

| Column | Field | Example |
|---|---|---|
| A | slug | `ecommerce-fulfillment-automation` |
| B | value | `60%` |
| C | label | `Increase in order processing speed` |
| D | order | `1` |

Each case study can have multiple stat rows. The `order` column controls display order.

---

## Troubleshooting

### "Cannot connect to admin server" on the dashboard

The Express server isn't running. Make sure you used `npm run admin`, not `npm run dev`. The admin requires both processes.

### "Sync failed" when clicking Sync Data Files

Check the terminal where `npm run admin` is running. Common causes:
- `GOOGLE_API_KEY` is not set in `.env`
- `GOOGLE_CASE_STUDIES_SHEET_ID` is not set in `.env`
- The sheet tab names don't match (case-sensitive)

### "Post not found" when trying to edit

The admin fetches posts live from Sheets. If a post was deleted directly in the Sheet, it won't be editable in the admin.

### "Unable to parse range: BlogPosts!A:M"

Your Blog Google Sheet's tab is not named `BlogPosts` exactly. Open the sheet, check the tab name at the bottom, and update `SHEETS.BLOG_POSTS` in `scripts/sheets-config.js` to match.

### "The caller does not have permission" on save

The service account doesn't have Editor access to that sheet. Go to the sheet → Share → confirm the service account email is listed as an Editor.

### Changes saved in admin not showing on the site

The admin writes directly to Google Sheets, but the site reads from the generated `src/data/` files. After saving in the admin:
1. Click **Sync Data Files** in the sidebar
2. Or run `npm run fetch-blog` / `npm run fetch-case-studies` manually

### service-account.json: Permission denied

On some systems the JSON key downloads with restricted permissions. Fix it:
```bash
chmod 644 service-account.json
```

---

## Environment Variables Reference

```env
# Required for read-only data fetching (existing)
GOOGLE_API_KEY=...
GOOGLE_SHEET_ID=...              # Products sheet
GOOGLE_BLOG_SHEET_ID=...         # Blog sheet

# Required for the Case Studies sheet (new)
GOOGLE_CASE_STUDIES_SHEET_ID=...

# Optional — alternative to service-account.json file
# Use this on servers/CI where you can't place a file
# Paste the entire contents of service-account.json as a single-line JSON string
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

---

## Security Notes

- `service-account.json` is in `.gitignore` — never commit it
- The admin has no login or password — it is a **local dev tool only**, not for production deployment
- The service account only has access to sheets you explicitly share with it
- Rotate the service account key at any time in Google Cloud Console → IAM → Service Accounts → Keys
