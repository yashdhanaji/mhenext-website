# MHE Next

Marketing website for MHE Next - a material handling equipment company specializing in forklifts, reach trucks, pallet trucks, and warehouse solutions.

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool with HMR
- **React Router** - Client-side routing
- **Motion (Framer Motion)** - Page transitions and interactive animations
- **@google/model-viewer** - 3D product model viewer
- **Lucide React** - Icon library
- **Vanilla CSS** - Styling with CSS custom properties

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the development server at `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx/css          # Navigation with products dropdown
│   ├── Hero.jsx/css            # Homepage hero with video background
│   ├── ProductsListing.jsx/css # Products listing page (category groups)
│   ├── ProductDetail.jsx/css   # Individual product detail page
│   ├── Products.jsx/css        # Product sections/cards
│   ├── FormModal.jsx/css       # Lead capture modal
│   ├── SpecsModal.jsx/css      # Full specifications overlay
│   ├── ExpandableCard.jsx/css  # Expandable content cards
│   ├── DrivingChange.jsx/css
│   ├── Industries.jsx/css
│   ├── Services.jsx/css
│   ├── WhyChooseUs.jsx/css
│   ├── Testimonials.jsx/css
│   ├── CaseStudies.jsx/css
│   ├── Partners.jsx/css
│   └── Footer.jsx/css
├── hooks/
│   └── useOutsideClick.js      # Click-outside detection hook
├── App.jsx                     # Routes and page composition
├── App.css
├── index.css                   # Global styles and CSS variables
└── main.jsx                    # Entry point
public/
├── logo.png                    # MHE Next logo
├── favicon.png                 # Site favicon
├── hero-video.mp4              # Homepage hero video
└── forklift-model.glb          # 3D forklift model (GLB)
```

## Pages

- `/` — Homepage
- `/products` — Products listing (all products grouped by category)
- `/products/electric-forklift` — Electric Counterbalance Forklift detail page

---

## Design System & Brand Guidelines

### Color Palette

- **Primary Orange:** `#eb6c2f` (`--primary-orange`)
- **Primary Orange Dark:** `#d45a20` (`--primary-orange-dark`)
- **Text Dark:** `#212121` (`--text-dark`)
- **Text Gray:** `#636363` (`--text-gray`)
- **Text Light Gray:** `#999999` (`--text-light-gray`)
- **Background Light:** `#f5f5f5` (`--bg-light`)
- **Background White:** `#ffffff` (`--bg-white`)
- **Border Light:** `rgba(0, 0, 0, 0.1)` (`--border-light`)
- **Gradients:**
  - Orange glow orbs: `rgba(235, 108, 47, 0.25–0.3)` with 250px blur
  - Card image overlay: `linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)`

### Typography

- **Font Family (Body):** Inter — loaded from Google Fonts
  - Weights: 400, 500, 600, 700, 900
- **Font Family (Headings):** Clash Grotesk — loaded from [Fontshare](https://www.fontshare.com/fonts/clash-grotesk)
  - Weights: 400, 500, 600, 700
  - Applied via `font-family: 'Clash Grotesk', sans-serif`
- **Global heading weight:** 500 (set in `index.css` on `h1–h6`)
- **Component heading weight:** 600 (dialled down from 700 to suit Clash Grotesk)
- **Hero Titles:** `clamp(48px, 7vw, 100px)`, weight 600, letter-spacing -0.03em
- **Section Titles:** `clamp(28px, 3.5vw, 44px)`, weight 600
- **Body Text:** 16–18px, weight 400, line-height 1.7
- **Labels/Eyebrows:** 11px, weight 600–700, uppercase, letter-spacing 0.12–0.15em
- **Base font-size:** 20px root (scaled via media queries)

### Layout & Spacing

- **Container:** `max-width: 1400px`, `margin: 0 auto`, `padding: 0 50px`
- **Section Padding:** 80px top/bottom (reduced at breakpoints)
- **Grid Gaps:** 24px for card grids, 80px for main 2-column layouts
- **Border Radius:** 20px for cards, 100px for pills/badges, 12px for thumbnails

### Animation Guidelines

- **Library:** Motion (Framer Motion) via `motion/react`
- **Initial State:** `{ opacity: 0, y: 30 }` (typical for scroll reveals)
- **Animate To:** `{ opacity: 1, y: 0 }`
- **Duration:** 0.4–0.6s with staggered delays (`delay: index * 0.1`)
- **Hover Effects:** `translateY(-6px)` + box-shadow on cards, spring physics on magnetic elements
- **Background:** 6 orange glow orbs with `animation: float 16s ease-in-out infinite alternate`
- **Flip Labels:** Per-character slide animation on category pills (stagger 0.02s per letter)

### Responsive Breakpoints

- **Desktop:** Default (3-column grids, full layout)
- **Tablet (≤1024px):** 2-column grids, reduced padding (30px)
- **Mobile (≤768px):** Single column, stacked layouts, padding 25px
- **Small (≤480px):** Further reduced spec grids and font scaling

### Interactive Components

- **3D Viewer Modal:** `@google/model-viewer` with camera-controls, auto-rotate, shadow
- **Flip Labels:** Per-character text reveal on hover (category pills on /products)
- **Form Modals:** Lead capture for quotes and brochure downloads
- **Tabbed Content:** Specifications, Features, Applications, Downloads with AnimatePresence
- **Image Gallery:** Thumbnail navigation with main image transitions
