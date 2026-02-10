import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import './ProductsListing.css';

function FlipLabel({ text }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="pl-category-label"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="pl-flip-text" aria-hidden="true">
        {text.split('').map((char, i) => (
          <span key={i} className="pl-flip-char">
            <motion.span
              className="pl-flip-front"
              animate={{ y: hovered ? '-100%' : '0%' }}
              transition={{ duration: 0.3, delay: i * 0.02, ease: [0.4, 0, 0.2, 1] }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
            <motion.span
              className="pl-flip-back"
              animate={{ y: hovered ? '0%' : '100%' }}
              transition={{ duration: 0.3, delay: i * 0.02, ease: [0.4, 0, 0.2, 1] }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </div>
  );
}

const productCategories = [
  {
    category: 'Counterbalance Forklifts',
    products: [
      {
        name: 'Electric Counterbalance Forklift',
        desc: 'Zero-emission powerhouse delivering 1.5–2.5 tons of lifting capacity with 8+ hours of continuous runtime.',
        image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80',
        badges: ['Electric'],
        specs: ['2.5T Capacity', '6.0m Lift', '8h+ Runtime'],
        link: '/products/electric-forklift',
      },
    ],
  },
  {
    category: 'Warehouse Equipment',
    products: [
      {
        name: 'Reach Truck',
        desc: 'Designed for narrow-aisle operations with reach heights up to 10.5 meters for high-density storage.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
        badges: ['Electric'],
        specs: ['2.0T Capacity', '10.5m Reach', 'Li-ion'],
        link: '/products/reach-truck',
      },
      {
        name: 'Order Picker',
        desc: 'Elevates the operator to picking height for efficient order fulfillment in warehouse environments.',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80',
        badges: ['Electric', 'Ergonomic'],
        specs: ['1.0T Capacity', '10m Height', 'Safe Platform'],
        link: '/products/order-picker',
      },
    ],
  },
  {
    category: 'Floor-Level Equipment',
    products: [
      {
        name: 'Pallet Truck',
        desc: 'Compact and efficient for ground-level pallet transport and dock-to-stock operations.',
        image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=600&q=80',
        badges: ['Electric', 'Compact'],
        specs: ['3.0T Capacity', 'Walk-behind', '24V'],
        link: '/products/pallet-truck',
      },
      {
        name: 'Stacker',
        desc: 'Versatile stacking solution for medium-height warehouse racking systems and logistics hubs.',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80',
        badges: ['Electric'],
        specs: ['1.6T Capacity', '5.4m Lift', 'Compact'],
        link: '/products/stacker',
      },
    ],
  },
];

export default function ProductsListing() {
  return (
    <div className="pl">
      <div className="pl-glow pl-glow-1" />
      <div className="pl-glow pl-glow-2" />
      <div className="pl-glow pl-glow-3" />
      <div className="pl-glow pl-glow-4" />
      <div className="pl-glow pl-glow-5" />
      <div className="pl-glow pl-glow-6" />

      {/* Hero */}
      <section className="pl-hero">
        <motion.div
          className="pl-breadcrumb"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to="/">HOME</Link>
          <ChevronRight size={12} />
          <span>PRODUCTS</span>
        </motion.div>

        <motion.h1
          className="pl-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Our Products
        </motion.h1>

        <motion.p
          className="pl-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          Explore our complete range of electric material handling equipment — engineered for performance, safety, and sustainability.
        </motion.p>
      </section>

      {/* Product Categories */}
      <section className="pl-categories">
        <div className="pl-container">
          {productCategories.map((cat, ci) => (
            <div key={ci} className="pl-category">
              <FlipLabel text={cat.category} />

              <div className="pl-grid">
                {cat.products.map((product, pi) => (
                  <motion.div
                    key={pi}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: pi * 0.1, duration: 0.4 }}
                  >
                    <Link to={product.link} className="pl-card">
                      <div className="pl-card-image">
                        <img src={product.image} alt={product.name} />
                        <div className="pl-card-overlay" />
                        <div className="pl-card-badges">
                          {product.badges.map((badge, j) => (
                            <span key={j} className="pl-card-badge">{badge}</span>
                          ))}
                        </div>
                      </div>
                      <div className="pl-card-body">
                        <div className="pl-card-name">{product.name}</div>
                        <div className="pl-card-desc">{product.desc}</div>
                        <div className="pl-card-specs">
                          {product.specs.map((spec, j) => (
                            <span key={j} className="pl-card-spec">{spec}</span>
                          ))}
                        </div>
                        <span className="pl-card-link">
                          VIEW DETAILS <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
