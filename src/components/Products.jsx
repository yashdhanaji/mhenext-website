import { useState } from 'react';
import {
  ChevronDown, ChevronUp, Check, Zap, ArrowRight, Star
} from 'lucide-react';
import './Products.css';

const Products = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('standard');

  const variants = {
    standard: { name: '1.5 Ton', price: '₹12,50,000', capacity: '1500 kg' },
    medium: { name: '2.0 Ton', price: '₹15,75,000', capacity: '2000 kg' },
    heavy: { name: '2.5 Ton', price: '₹18,90,000', capacity: '2500 kg' }
  };

  const qualityTests = [
    { name: 'Load Testing', status: 'Certified', desc: '125% rated capacity stress test' },
    { name: 'Safety Systems', status: 'Certified', desc: 'ISO 3691-1 compliance verified' },
    { name: 'Battery Performance', status: 'Certified', desc: '2000+ charge cycle rating' },
    { name: 'Durability', status: 'Certified', desc: '10,000 hour operational test' }
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', company: 'Delhivery Logistics', quote: 'The electric forklifts from MHE Next transformed our warehouse efficiency. 40% reduction in operating costs.', rating: 5 },
    { name: 'Priya Sharma', company: 'Flipkart Fulfillment', quote: 'Exceptional build quality and the after-sales support is outstanding. Highly recommend.', rating: 5 },
    { name: 'Amit Patel', company: 'Reliance Retail', quote: 'We\'ve deployed 15 units across our facilities. Zero downtime in 18 months of operation.', rating: 5 }
  ];

  const relatedProducts = [
    { name: 'Reach Truck', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80', desc: 'For high-rack storage' },
    { name: 'Pallet Truck', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80', desc: 'Ground-level transport' },
    { name: 'Order Picker', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&q=80', desc: 'Efficient order fulfillment' }
  ];

  const faqs = [
    { q: 'What is the warranty period?', a: 'All our electric forklifts come with a comprehensive 3-year warranty covering the chassis, mast, and electrical components. Battery warranty is 2 years or 2000 charge cycles, whichever comes first.' },
    { q: 'Do you provide operator training?', a: 'Yes, we provide complimentary operator training for up to 5 operators per unit purchased. Additional training sessions can be arranged at nominal charges.' },
    { q: 'What is the lead time for delivery?', a: 'Standard configurations are typically delivered within 2-3 weeks. Custom specifications may require 4-6 weeks depending on requirements.' },
    { q: 'Is financing available?', a: 'Yes, we offer flexible financing options including EMI plans, lease-to-own arrangements, and rental programs. Our team can help you choose the best option for your budget.' },
    { q: 'What after-sales support do you provide?', a: 'We offer 24/7 breakdown support, annual maintenance contracts, genuine spare parts supply, and a dedicated service team across major cities in India.' },
    { q: 'Can the forklift be customized?', a: 'Absolutely. We offer various customizations including fork length, mast height, attachments (side shifters, clamps, rotators), and cabin configurations to match your specific operational needs.' }
  ];

  return (
    <section className="products-page">
      {/* Hero Section */}
      <div className="product-hero-wrapper">
        <div className="product-hero">
          <div className="product-hero-content">
          <div className="product-hero-badge">
            <Zap size={14} />
            <span>Electric Powered</span>
          </div>
          <h1 className="product-hero-title">
            Electric Counterbalance Forklift
          </h1>
          <p className="product-hero-subtitle">
            Power your warehouse with clean, efficient, and reliable material handling.
            Our electric counterbalance forklifts deliver exceptional performance with
            zero emissions and minimal maintenance.
          </p>
          <div className="product-hero-cta">
            <button className="btn btn-primary">Get a Quote</button>
            <button className="btn btn-secondary">Download Brochure</button>
          </div>
        </div>
        <div className="product-hero-visual">
          <div className="product-main-image">
            <img
              src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80"
              alt="Electric Counterbalance Forklift"
            />
          </div>
          <div className="product-hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-number">1.5-2.5</span>
              <span className="hero-stat-label">Ton Capacity</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">8+ hrs</span>
              <span className="hero-stat-label">Battery Life</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">6m</span>
              <span className="hero-stat-label">Max Lift Height</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Product Showcase & Pricing */}
      <div className="product-showcase">
        <div className="container">
          <div className="showcase-grid">
            <div className="showcase-image">
              <div className="promo-badge">
                <span>Limited Offer</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500&q=80"
                alt="Forklift Detail"
              />
            </div>
            <div className="showcase-details">
              <h2 className="showcase-title">Choose Your Configuration</h2>
              <p className="showcase-desc">Select the capacity that matches your operational requirements</p>

              <div className="variant-selector">
                {Object.entries(variants).map(([key, variant]) => (
                  <button
                    key={key}
                    className={`variant-btn ${selectedVariant === key ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(key)}
                  >
                    <span className="variant-name">{variant.name}</span>
                    <span className="variant-capacity">{variant.capacity}</span>
                  </button>
                ))}
              </div>

              <div className="price-display">
                <span className="price-label">Starting from</span>
                <span className="price-value">{variants[selectedVariant].price}</span>
                <span className="price-note">*Ex-showroom price. GST extra.</span>
              </div>

              <div className="showcase-includes">
                <h4>Package Includes:</h4>
                <ul>
                  <li><Check size={16} /> Standard battery charger</li>
                  <li><Check size={16} /> Operator training (5 personnel)</li>
                  <li><Check size={16} /> 3-year comprehensive warranty</li>
                  <li><Check size={16} /> First-year AMC free</li>
                </ul>
              </div>

              <div className="showcase-actions">
                <button className="btn btn-primary btn-large">
                  Request Quote
                  <ArrowRight size={18} />
                </button>
                <span className="stock-status">
                  <span className="stock-dot"></span>
                  In Stock - Ready to Ship
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Quality Section - Side by Side */}
      <div className="specs-quality-section">
        <div className="container">
          <div className="specs-quality-grid">
            {/* Technical Specifications */}
            <div className="specs-column">
              <h2>Technical Specifications</h2>
              <p className="specs-subtitle">Detailed specs for the {variants[selectedVariant].name} variant</p>
              <div className="specs-table">
                <div className="spec-row">
                  <span className="spec-label">Load Capacity</span>
                  <span className="spec-value">{variants[selectedVariant].capacity}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Lift Height (Standard)</span>
                  <span className="spec-value">3000 mm</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Lift Height (Max)</span>
                  <span className="spec-value">6000 mm</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Fork Length</span>
                  <span className="spec-value">1070 mm</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Travel Speed (Loaded)</span>
                  <span className="spec-value">14 km/h</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Lift Speed (Loaded)</span>
                  <span className="spec-value">0.45 m/s</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Battery Voltage</span>
                  <span className="spec-value">48V / 80V</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Battery Capacity</span>
                  <span className="spec-value">400-700 Ah</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Turning Radius</span>
                  <span className="spec-value">2100 mm</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Overall Length</span>
                  <span className="spec-value">3450 mm</span>
                </div>
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="quality-column">
              <h2>Quality Tested, Performance Guaranteed</h2>
              <p className="quality-subtitle">Every unit undergoes rigorous testing and certification before delivery, ensuring you receive equipment that meets the highest international standards.</p>
              <div className="quality-badges">
                <span className="quality-badge">ISO 9001:2015</span>
                <span className="quality-badge">CE Certified</span>
                <span className="quality-badge">BIS Approved</span>
              </div>
              <div className="quality-tests">
                {qualityTests.map((test, index) => (
                  <div key={index} className="quality-test-card">
                    <div className="test-status">
                      <Check size={16} />
                      <span>{test.status}</span>
                    </div>
                    <h4>{test.name}</h4>
                    <p>{test.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="product-testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Real Stories, Real Results</h2>
            <p>Trusted by leading businesses across India</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <span className="author-name">{testimonial.name}</span>
                  <span className="author-company">{testimonial.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <div className="container">
          <div className="section-header">
            <h2>Explore Related Equipment</h2>
            <p>Complete your material handling fleet</p>
          </div>
          <div className="related-grid">
            {relatedProducts.map((product, index) => (
              <div key={index} className="related-card">
                <div className="related-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="related-info">
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                  <div className="related-actions">
                    <button className="btn btn-primary btn-small">Get Started</button>
                    <button className="btn btn-text">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our electric forklifts</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Products;
