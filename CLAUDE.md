# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MHE Next marketing website - a React single-page application for a material handling equipment company. Built with Vite and uses vanilla CSS (no CSS framework).

## Commands

```bash
npm run dev      # Start development server (Vite HMR)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Architecture

**Entry Point:** `src/main.jsx` → `src/App.jsx`

**Component Structure:** Each component has a paired `.jsx` and `.css` file in `src/components/`:
- Header (navigation with mobile menu toggle & products dropdown)
- Hero (video background with stats card)
- DrivingChange, Industries, Services, WhyChooseUs (content sections)
- Testimonials, CaseStudies, Partners (social proof sections)
- ProductsListing (products listing page with category groups & animated flip labels)
- ProductDetail (individual product page with gallery, tabs, 3D viewer)
- FormModal (lead capture modal for quotes & brochures)
- SpecsModal (full specifications overlay)
- ExpandableCard (expandable content cards)
- Footer (newsletter signup, links, contact info)

**Routing:**
- `/` — Homepage
- `/products` — Products listing page (all products grouped by category)
- `/products/electric-forklift` — Electric Counterbalance Forklift detail page

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
