import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { productCategories } from '../data/products';
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
