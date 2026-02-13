# Google Sheets Product Management - Setup Guide

This guide will walk you through setting up Google Sheets as your product database for the MHE Next website.

## Overview

Instead of manually editing `src/data/products.js`, you can now manage products in Google Sheets with your team. When you run the build, the latest data is automatically fetched from your sheet.

**Benefits:**
- ✅ Collaborative editing with your team
- ✅ Familiar spreadsheet interface
- ✅ Built-in version history
- ✅ No code changes needed for product updates
- ✅ Free (using Google's infrastructure)

---

## Step 1: Install Dependencies

First, install the required npm packages:

```bash
npm install
```

This installs `googleapis` and `dotenv` which are needed to fetch data from Google Sheets.

---

## Step 2: Create Google API Key

You need a Google API key to access Google Sheets data.

### 2.1. Go to Google Cloud Console

Visit: https://console.cloud.google.com/

### 2.2. Create a New Project (or select existing)

1. Click the project dropdown at the top
2. Click "New Project"
3. Name it "MHE Next Website" (or any name)
4. Click "Create"

### 2.3. Enable Google Sheets API

1. Go to: https://console.cloud.google.com/apis/library/sheets.googleapis.com
2. Make sure your project is selected
3. Click "Enable"

### 2.4. Create API Key

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" → "API Key"
3. Copy the API key (you'll need this in Step 5)
4. (Optional) Click "Restrict Key" and:
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Sheets API" from the dropdown
   - Click "Save"

---

## Step 3: Migrate Existing Products to CSV

Run the migration script to convert your existing products to CSV format:

```bash
npm run migrate-to-sheets
```

This creates a `migration-output/` folder with 11 CSV files:
- `1-Products.csv` - Main product info
- `2-Images.csv` - Product images
- `3-QuickSpecs.csv` - Quick specs (listing page)
- `4-Specs.csv` - Basic specs
- `5-Features.csv` - Simple features
- `6-FullFeatures.csv` - Detailed features with icons
- `7-Applications.csv` - Simple applications
- `8-FullApplications.csv` - Detailed applications with icons
- `9-Downloads.csv` - Downloadable resources
- `10-RelatedProducts.csv` - Related product links
- `11-FullSpecs.csv` - Full specifications (detail page)

---

## Step 4: Create Google Sheet

### 4.1. Create New Sheet

1. Go to: https://sheets.google.com/
2. Click "Blank" to create a new spreadsheet
3. Name it "MHE Next - Products"

### 4.2. Create Tabs

You need to create 11 tabs (one for each CSV file). Rename the first sheet to "Products" and create the rest:

**Tab Names (must match exactly):**
1. `Products`
2. `Images`
3. `QuickSpecs`
4. `Specs`
5. `Features`
6. `FullFeatures`
7. `Applications`
8. `FullApplications`
9. `Downloads`
10. `RelatedProducts`
11. `FullSpecs`

To add a new tab: Click the "+" button at the bottom left.

### 4.3. Import CSV Files

For each tab, import the corresponding CSV file:

1. Select the tab (e.g., "Products")
2. Go to: **File → Import → Upload**
3. Select the CSV file (e.g., `1-Products.csv`)
4. Choose:
   - **Import location:** "Replace current sheet"
   - **Separator type:** "Detect automatically"
5. Click "Import data"
6. Repeat for all 11 tabs

### 4.4. Make Sheet Accessible

**Option A: Make it publicly viewable** (simplest)
1. Click "Share" button (top right)
2. Under "General access", select "Anyone with the link"
3. Set permission to "Viewer"
4. Click "Done"

**Option B: Share with specific Google account** (more secure)
1. Click "Share" button
2. Add your build server's Google account (if using CI/CD)
3. Set permission to "Viewer"
4. Click "Share"

### 4.5. Get Sheet ID

Copy the Sheet ID from the URL:

```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
                                       ^^^^^^^^^^^^^^^^^^^^
                                       Copy this part
```

---

## Step 5: Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
GOOGLE_SHEET_ID=paste_your_sheet_id_here
GOOGLE_API_KEY=paste_your_api_key_here
```

**Important:** Never commit `.env` to git. It's already in `.gitignore`.

---

## Step 6: Test the Setup

Run the fetch script to test if everything works:

```bash
npm run fetch-products
```

You should see:
```
🔄 Fetching product data from Google Sheets...
   Sheet ID: your_sheet_id
✅ Data fetched successfully
📦 Building 7 products...
📝 Generating products.js...
✅ Products file generated: /path/to/src/data/products.js
   Total products: 7
```

If you see any errors, check:
- ✅ API key is correct
- ✅ Sheet ID is correct
- ✅ Google Sheets API is enabled
- ✅ Sheet is shared/public
- ✅ Tab names match exactly (case-sensitive)

---

## Step 7: Run the Website

Now you can run the website as usual:

```bash
npm run dev
```

The `dev` script automatically runs `fetch-products` before starting Vite, so your latest data is always loaded.

Navigate to:
- http://localhost:5173/products - See all products
- http://localhost:5173/products/electric-forklift - See product detail

Verify all products display correctly with images, specs, and features.

---

## How to Update Products

### Making Changes

1. **Open Google Sheet**: Go to your sheet at https://sheets.google.com/
2. **Edit data**: Make changes to any product info
3. **Save**: Changes auto-save in Google Sheets
4. **Rebuild**: Run `npm run dev` or `npm run build`
5. **Deploy**: Deploy the new build to your hosting

**Important:** Changes in Google Sheets are NOT live immediately. You must rebuild and redeploy the site.

### Adding a New Product

To add a new product, you need to add data across multiple tabs:

1. **Products tab**: Add a row with basic info (slug, name, category, etc.)
2. **Images tab**: Add 4 rows (one per image) with the product slug
3. **QuickSpecs tab**: Add 3-4 rows for quick specs
4. **Specs tab**: Add 6-8 rows for basic specs
5. **Features tab**: Add 6 rows for features
6. **FullFeatures tab**: Add 6 rows for detailed features
7. **Applications tab**: Add 6 rows for applications
8. **FullApplications tab**: Add 6 rows for detailed applications
9. **Downloads tab**: Add 4 rows for downloads
10. **FullSpecs tab**: Add 8-12 rows for full specifications
11. **RelatedProducts tab**: Add 3 rows for related product slugs

**Tip:** Copy an existing product's rows and modify them.

### Editing Existing Product

Just edit the relevant cells in the sheet. The `order` column controls the display order (1, 2, 3, etc.).

### Deleting a Product

Delete all rows for that product across all tabs. Use "Filter" to find all rows for a specific `productSlug`.

---

## Sheet Structure Reference

### Products Tab

| slug | name | category | eyebrow | has3DModel | shortDesc | description | badge1 | badge2 |
|------|------|----------|---------|------------|-----------|-------------|--------|--------|
| electric-forklift | Electric Counterbalance Forklift | Electric Forklifts | Electric Counterbalance | TRUE | Zero-emission powerhouse... | Zero emissions. Maximum... | Electric | Best Seller |

- **slug**: URL-safe identifier (e.g., `electric-forklift`)
- **has3DModel**: Use `TRUE` or `FALSE`
- **badge1, badge2**: Optional badges (leave empty if not needed)

### Images Tab

| productSlug | imageURL | order |
|-------------|----------|-------|
| electric-forklift | https://... | 1 |
| electric-forklift | https://... | 2 |

- **order**: Display order (1 = first image)
- Add 4 images per product

### QuickSpecs Tab

| productSlug | value | label | order |
|-------------|-------|-------|-------|
| electric-forklift | 2.5T | Max Capacity | 1 |
| electric-forklift | 6.0m | Lift Height | 2 |

- Used on product listing cards
- Add 3-4 per product

### Specs Tab

| productSlug | label | value | order |
|-------------|-------|-------|-------|
| electric-forklift | Load Capacity | 1,500 – 2,500 kg | 1 |

- Basic specifications
- Add 6-8 per product

### Features Tab

| productSlug | text | order |
|-------------|------|-------|
| electric-forklift | Regenerative braking system | 1 |

- Simple feature text
- Add 6 per product

### FullFeatures Tab

| productSlug | icon | title | desc | order |
|-------------|------|-------|------|-------|
| electric-forklift | Battery | Advanced Battery System | High-capacity lithium-ion... | 1 |

- **icon**: Must be one of: Battery, Shield, Gauge, Settings, Leaf, Wrench, Warehouse, Factory, Package, Truck, Star, Box, Zap, Clock, Cpu, ThermometerSnowflake, Weight, Cog
- Add 6 per product

### Applications Tab

| productSlug | name | order |
|-------------|------|-------|
| electric-forklift | Warehousing | 1 |

- Simple application names
- Add 6 per product

### FullApplications Tab

| productSlug | icon | name | desc | order |
|-------------|------|------|------|-------|
| electric-forklift | Warehouse | Warehousing | Pallet movement, racking... | 1 |

- Same icon options as FullFeatures
- Add 6 per product

### Downloads Tab

| productSlug | name | size | order |
|-------------|------|------|-------|
| electric-forklift | Product Brochure | PDF · 4.2 MB | 1 |

- Add 4 per product

### RelatedProducts Tab

| productSlug | relatedSlug | order |
|-------------|-------------|-------|
| electric-forklift | electric-forklift-3t | 1 |

- Cross-sell related products
- Add 3 per product

### FullSpecs Tab

| productSlug | label | value | order |
|-------------|-------|-------|-------|
| electric-forklift | Load Capacity | 1.5 – 2.5 Ton | 1 |

- Full specifications (shown on product detail page)
- Add 8-12 per product

---

## Automation (Optional)

### Manual Workflow

Current workflow requires manual rebuild:
1. Edit Google Sheet
2. Run `npm run build`
3. Deploy to hosting

### GitHub Actions (Scheduled)

You can set up automated rebuilds every 6 hours:

1. Add `.github/workflows/update-products.yml`:

```yaml
name: Update Products

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:  # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
        env:
          GOOGLE_SHEET_ID: ${{ secrets.GOOGLE_SHEET_ID }}
          GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
      - name: Deploy
        # Add your deployment step here (Netlify, Vercel, etc.)
```

2. Add secrets in GitHub:
   - Go to: Settings → Secrets and variables → Actions
   - Add `GOOGLE_SHEET_ID`
   - Add `GOOGLE_API_KEY`

### Webhook Trigger (Instant Updates)

For instant updates when the sheet changes, you can use Google Apps Script to trigger a webhook to your CI/CD platform. This is more advanced but updates within 2-5 minutes.

---

## Troubleshooting

### Error: "GOOGLE_API_KEY environment variable is not set"

**Solution:** Create a `.env` file with your API key:
```bash
cp .env.example .env
# Edit .env and add your API key
```

### Error: "The caller does not have permission"

**Solution:** Make sure:
1. Google Sheets API is enabled in your Google Cloud project
2. Your sheet is shared publicly or with your service account
3. Your API key is not restricted to other APIs

### Error: "Unable to parse range"

**Solution:** Check that tab names in your Google Sheet match exactly:
- `Products` (not "Product" or "products")
- `Images` (not "Image")
- etc.

Tab names are case-sensitive!

### Products not showing on website

**Solution:**
1. Check `src/data/products.js` was generated (should have timestamp in header)
2. Run `npm run dev` again (it auto-fetches on start)
3. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Invalid icon warnings

**Solution:** Icons must match exactly (case-sensitive):
- ✅ `Battery`, `Shield`, `Gauge`
- ❌ `battery`, `BATTERY`, `BatteryIcon`

See available icons in `scripts/sheets-config.js`.

---

## FAQ

**Q: Do I need to commit src/data/products.js?**
A: It depends:
- **Local dev**: You can gitignore it and fetch on every build
- **CI/CD**: Don't commit it, fetch during build
- **Static hosting without CI/CD**: Commit it if you build locally and push dist/

**Q: Can I use the old products.js file?**
A: Yes! If you don't want to use Google Sheets, just:
1. Don't run `npm run fetch-products`
2. Manually edit `src/data/products.js` as before
3. Remove the fetch step from `package.json` scripts

**Q: How much does this cost?**
A: $0. Google Sheets API has a generous free quota:
- 500 requests per 100 seconds per user
- Way more than enough for a small team

**Q: Can I use a different spreadsheet tool (Excel, Airtable)?**
A: Not directly, but you can:
- Export from Excel/Airtable to CSV
- Import CSV into Google Sheets
- Or modify the scripts to use different APIs

**Q: What if Google Sheets is down?**
A: Your website won't be affected (it uses the generated products.js). You just can't rebuild with new data until it's back.

---

## Support

If you run into issues:

1. Check this guide's Troubleshooting section
2. Check the console output for error messages
3. Verify your API key and Sheet ID are correct
4. Test the Google Sheets API in the browser:
   ```
   https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID?key=YOUR_API_KEY
   ```

---

## Summary

✅ **What you've set up:**
- Google Sheets as product database
- Automatic data fetching on build
- CSV migration for existing products
- Team collaboration via Google Sheets

✅ **What your team can now do:**
- Edit products in spreadsheet interface
- Collaborate in real-time
- Track changes with version history
- No code changes needed

✅ **When you need to rebuild:**
- After editing Google Sheet
- Before deploying to production
- Run: `npm run build` then deploy

Happy product managing! 🚀
