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
- Header (navigation with mobile menu toggle)
- Hero (video background with stats card)
- DrivingChange, Industries, Services, WhyChooseUs (content sections)
- Testimonials, CaseStudies, Partners (social proof sections)
- Footer (newsletter signup, links, contact info)

**Styling:**
- CSS custom properties defined in `src/index.css` (brand colors, typography)
- Primary brand color: `--primary-orange: #eb6c2f`
- Base font-size: 20px root (scaled for different viewports via media queries)
- Fonts: Inter (body), Instrument Sans (headings)

**Static Assets:** `public/` contains logo.png, favicon.png, hero-video.mp4

**Icons:** lucide-react library for all icons
