# MHE Next

Marketing website for MHE Next - a material handling equipment company specializing in forklifts, reach trucks, pallet trucks, and warehouse solutions.

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool with HMR
- **React Router** - Client-side routing
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
│   ├── Header.jsx/css      # Navigation with products dropdown
│   ├── Hero.jsx/css        # Homepage hero with video background
│   ├── Products.jsx/css    # Product detail page
│   ├── DrivingChange.jsx/css
│   ├── Industries.jsx/css
│   ├── Services.jsx/css
│   ├── WhyChooseUs.jsx/css
│   ├── Testimonials.jsx/css
│   ├── CaseStudies.jsx/css
│   ├── Partners.jsx/css
│   └── Footer.jsx/css
├── App.jsx                 # Routes and page composition
├── App.css
├── index.css               # Global styles and CSS variables
└── main.jsx                # Entry point
public/
├── logo.png                # MHE Next logo
├── favicon.png             # Site favicon
└── hero-video.mp4          # Homepage hero video
```

## Pages

- `/` - Homepage
- `/products/electric-forklift` - Electric Counterbalance Forklift product page

## Brand Colors

- Primary Orange: `#eb6c2f`
- Primary Orange Dark: `#d45a20`
- Text Dark: `#212121`
- Text Gray: `#636363`

## Fonts

- **Inter** - Body text
- **Instrument Sans** - Headings
