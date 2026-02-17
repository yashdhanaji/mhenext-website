# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MHE Next marketing website - a React single-page application for a material handling equipment company. Built with Vite and uses vanilla CSS (no CSS framework).

## Commands

```bash
npm run dev              # Fetch products from Google Sheets & start dev server (Vite HMR)
npm run build            # Fetch products & production build to dist/
npm run preview          # Preview production build locally
npm run lint             # Run ESLint
npm run fetch-products   # Manually fetch product data from Google Sheets
npm run migrate-to-sheets # One-time migration script for moving products to Sheets
```

## Architecture

**Entry Point:** `src/main.jsx` → `src/App.jsx`

**Component Structure:** Each component has a paired `.jsx` and `.css` file in `src/components/`:
- Header (navigation with mobile menu toggle & products dropdown)
- Hero (video background with stats card)
- DrivingChange, Industries, Services, WhyChooseUs (content sections)
- Testimonials, CaseStudies, Partners (social proof sections)
- About (about page)
- CaseStudiesPage (case studies full page)
- BlogPage (blog page)
- ProductsListing (products listing page with category groups & animated flip labels)
- ProductDetail (individual product page with gallery, tabs, 3D viewer)
- FormModal (lead capture modal for quotes & brochures)
- SpecsModal (full specifications overlay)
- ExpandableCard (expandable content cards)
- Footer (newsletter signup, links, contact info)

**Routing:**
- `/` — Homepage
- `/about` — About page
- `/case-studies` — Case studies page
- `/blog` — Blog page
- `/products` — Products listing page (all products grouped by category)
- `/products/:slug` — Individual product detail page (dynamic route)

**Styling:**
- CSS custom properties defined in `src/index.css` (brand colors, typography)
- Primary brand color: `--primary-orange: #eb6c2f`
- Base font-size: 20px root (scaled for different viewpoints via media queries)
- Fonts: Inter (body), Clash Grotesk (headings — loaded from Fontshare)
- Heading weight: 500–600 (dialled down for Clash Grotesk's heavier rendering)

**Static Assets:** `public/` contains logo.png, favicon.png, hero-video.mp4, forklift-model.glb

**3D Model:** `public/forklift-model.glb` — loaded via `@google/model-viewer` in ProductDetail's 3D viewer modal

**Icons:** lucide-react library for all icons

**Animations:** `motion` (Framer Motion) for page transitions, staggered reveals, and interactive elements

**Data Management:**
- Product catalog is managed via Google Sheets
- `scripts/fetch-products.js` fetches data from Google Sheets API and generates `src/data/products.js`
- Runs automatically before dev server starts and production builds
- Environment variables required: `GOOGLE_SHEET_ID`, `GOOGLE_API_KEY`
- Configuration in `scripts/sheets-config.js` (sheet names, columns, icons, category order)
