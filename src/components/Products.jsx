import { useState } from 'react';
import {
  ChevronDown, ChevronUp, Check, ArrowRight, Star,
  Zap, Battery, Shield, Gauge, Leaf, Wrench, Clock, Award, ClipboardList
} from 'lucide-react';
import FormModal from './FormModal';
import SpecsModal from './SpecsModal';
import './Products.css';

const Products = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formModal, setFormModal] = useState({ open: false, title: '', subtitle: '' });
  const [specsOpen, setSpecsOpen] = useState(false);
  const [activeVariant, setActiveVariant] = useState(0);

  const productVariants = [
    {
      name: '1.5 Ton · Standard',
      tag: '1.5T',
      image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=700&q=80',
      description: 'Ideal for light-duty warehousing, retail backrooms, and compact storage facilities. The perfect entry point into electric material handling.',
      highlights: [
        '1,500 kg load capacity',
        '4,500 mm max lift height',
        '48V · 400 Ah battery system',
        '6-hour charge · 8+ hour runtime',
        '1,950 mm turning radius',
        'Compact footprint for narrow aisles',
      ],
    },
    {
      name: '2.0 Ton · Popular',
      tag: '2.0T',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=700&q=80',
      description: 'Our best-selling configuration — built for mid-sized warehouses and distribution centers that demand versatility and power in equal measure.',
      highlights: [
        '2,000 kg load capacity',
        '5,500 mm max lift height',
        '80V · 560 Ah battery system',
        '7-hour charge · 8+ hour runtime',
        '2,050 mm turning radius',
        'Regenerative braking standard',
      ],
    },
    {
      name: '2.5 Ton · Heavy Duty',
      tag: '2.5T',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&q=80',
      description: 'Maximum performance for high-throughput operations — manufacturing floors, heavy logistics, and facilities that move serious tonnage daily.',
      highlights: [
        '2,500 kg load capacity',
        '6,000 mm max lift height',
        '80V · 700 Ah battery system',
        '8-hour charge · 8+ hour runtime',
        '2,100 mm turning radius',
        'Heavy-duty mast & chassis',
      ],
    },
  ];

  const openForm = (title, subtitle = '') => {
    setFormModal({ open: true, title, subtitle });
  };
  const closeForm = () => {
    setFormModal({ open: false, title: '', subtitle: '' });
  };

  const benefits = [
    { icon: <Battery size={24} />, label: '8+ Hour', desc: 'Battery Life' },
    { icon: <Gauge size={24} />, label: '2.5 Ton', desc: 'Max Capacity' },
    { icon: <Shield size={24} />, label: '3 Year', desc: 'Warranty' },
    { icon: <Leaf size={24} />, label: 'Zero', desc: 'Emissions' },
    { icon: <Wrench size={24} />, label: '24/7', desc: 'Service Support' },
    { icon: <Award size={24} />, label: 'ISO', desc: 'Certified' },
  ];

  const howItWorks = [
    { step: '01', title: 'Consult', desc: 'Our specialists assess your warehouse layout, load requirements, and operational workflow to recommend the right configuration.' },
    { step: '02', title: 'Configure', desc: 'Choose from 1.5T, 2.0T, or 2.5T capacity variants. Customize mast height, fork length, and attachments to match your needs.' },
    { step: '03', title: 'Deploy', desc: 'We handle delivery, installation, operator training for up to 5 personnel, and ensure your team is fully operational from day one.' },
  ];

  const qualityMarks = [
    { label: 'ISO 9001:2015', desc: 'Quality Management System certified manufacturing process.' },
    { label: 'CE Certified', desc: 'Meets European health, safety, and environmental protection standards.' },
    { label: 'BIS Approved', desc: 'Bureau of Indian Standards approved for domestic operations.' },
    { label: '125% Load Tested', desc: 'Every unit stress-tested at 125% rated capacity before delivery.' },
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', role: 'Head of Operations', company: 'Delhivery Logistics', quote: 'The electric forklifts from MHE Next transformed our warehouse efficiency. 40% reduction in operating costs within the first quarter.', rating: 5 },
    { name: 'Priya Sharma', role: 'Fulfillment Director', company: 'Flipkart', quote: 'Exceptional build quality and the after-sales support is outstanding. The machines run quietly and reliably — exactly what we needed.', rating: 5 },
    { name: 'Amit Patel', role: 'Supply Chain VP', company: 'Reliance Retail', quote: 'We\'ve deployed 15 units across our facilities. Zero downtime in 18 months of operation. The ROI speaks for itself.', rating: 5 },
  ];

  const faqs = [
    { q: 'What is the warranty period?', a: 'All our electric forklifts come with a comprehensive 3-year warranty covering the chassis, mast, and electrical components. Battery warranty is 2 years or 2,000 charge cycles, whichever comes first.' },
    { q: 'Do you provide operator training?', a: 'Yes, we provide complimentary operator training for up to 5 operators per unit purchased. Additional training sessions can be arranged at nominal charges.' },
    { q: 'What is the lead time for delivery?', a: 'Standard configurations are typically delivered within 2–3 weeks. Custom specifications may require 4–6 weeks depending on requirements.' },
    { q: 'Is financing available?', a: 'Yes, we offer flexible financing options including EMI plans, lease-to-own arrangements, and rental programs. Our team can help you choose the best option for your budget.' },
    { q: 'What after-sales support do you provide?', a: 'We offer 24/7 breakdown support, annual maintenance contracts, genuine spare parts supply, and a dedicated service team across major cities in India.' },
    { q: 'Can the forklift be customized?', a: 'Absolutely. We offer various customizations including fork length, mast height, attachments (side shifters, clamps, rotators), and cabin configurations to match your specific operational needs.' },
  ];

  return (
    <div className="pdp">
      {/* Gradient circle orbs */}
      <div className="pdp-glow pdp-glow-1" />
      <div className="pdp-glow pdp-glow-2" />
      <div className="pdp-glow pdp-glow-3" />
      <div className="pdp-glow pdp-glow-4" />
      <div className="pdp-glow pdp-glow-5" />
      <div className="pdp-glow pdp-glow-6" />

      <FormModal
        isOpen={formModal.open}
        onClose={closeForm}
        title={formModal.title}
        subtitle={formModal.subtitle}
      />
      <SpecsModal
        isOpen={specsOpen}
        onClose={() => setSpecsOpen(false)}
      />

      {/* ════════ HERO ════════ */}
      <section className="pdp-hero">
        <div className="pdp-hero-inner">
          <div className="pdp-hero-text">
            <span className="pdp-eyebrow">Electric Counterbalance Forklift</span>
            <h1 className="pdp-hero-title">
              Power Without<br />Compromise.
            </h1>
            <p className="pdp-hero-subtitle">
              Zero emissions. Maximum performance. Our electric counterbalance
              forklift delivers 1.5–2.5 tons of lifting power with 8+ hours of
              continuous operation — engineered for the modern warehouse.
            </p>
            <div className="pdp-hero-actions">
              <button
                className="pdp-btn pdp-btn-primary"
                onClick={() => openForm('Get a Quote', 'Tell us your requirements and we\'ll prepare a custom quote.')}
              >
                Get a Quote
              </button>
              <button
                className="pdp-btn pdp-btn-outline"
                onClick={() => openForm('Download Brochure', 'Enter your details and we\'ll send the brochure to your email.')}
              >
                Download Brochure
              </button>
            </div>
            <p className="pdp-hero-note">Free operator training included</p>
          </div>
          <div className="pdp-hero-image">
            <img
              src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&q=80"
              alt="Electric Counterbalance Forklift"
            />
          </div>
        </div>
      </section>

      {/* ════════ BENEFITS STRIP ════════ */}
      <section className="pdp-benefits-strip">
        <div className="pdp-container">
          <div className="pdp-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="pdp-benefit-item">
                <span className="pdp-benefit-icon">{b.icon}</span>
                <div>
                  <span className="pdp-benefit-label">{b.label}</span>
                  <span className="pdp-benefit-desc">{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ INTRO STATEMENT ════════ */}
      <section className="pdp-statement">
        <div className="pdp-container pdp-container-narrow">
          <h2 className="pdp-statement-text">
            Most forklifts move loads.<br />
            <span>Ours moves your business forward.</span>
          </h2>
          <p className="pdp-statement-body">
            Engineered with precision, built for endurance, and designed around
            the operator — our electric counterbalance forklift combines cutting-edge
            battery technology with intelligent load management to deliver performance
            that traditional ICE forklifts simply cannot match.
          </p>
        </div>
      </section>

      {/* ════════ PRODUCT VARIANTS ════════ */}
      <section className="pdp-variants">
        <div className="pdp-container">
          <div className="pdp-variants-header">
            <span className="pdp-label">Variants</span>
            <h2 className="pdp-section-title">Choose Your Configuration</h2>
            <p className="pdp-body">Select a variant that matches your operational requirements.</p>
          </div>

          <div className="pdp-variants-tabs">
            {productVariants.map((v, i) => (
              <button
                key={i}
                className={`pdp-variant-tab ${activeVariant === i ? 'active' : ''}`}
                onClick={() => setActiveVariant(i)}
              >
                <Zap size={18} />
                <span>{v.name}</span>
              </button>
            ))}
          </div>

          <div className="pdp-variants-content">
            <div className="pdp-variants-image">
              <img src={productVariants[activeVariant].image} alt={productVariants[activeVariant].name} />
            </div>
            <div className="pdp-variants-info">
              <h3 className="pdp-variants-name">{productVariants[activeVariant].name}</h3>
              <p className="pdp-variants-desc">{productVariants[activeVariant].description}</p>
              <ul className="pdp-check-list">
                {productVariants[activeVariant].highlights.map((h, j) => (
                  <li key={j}><Check size={18} /> {h}</li>
                ))}
              </ul>
              <div className="pdp-split-actions">
                <button
                  className="pdp-btn pdp-btn-primary"
                  onClick={() => openForm(`Get a Quote — ${productVariants[activeVariant].tag}`, `Request pricing for the ${productVariants[activeVariant].name} variant.`)}
                >
                  Get a Quote <ArrowRight size={16} />
                </button>
                <button
                  className="pdp-btn pdp-btn-outline"
                  onClick={() => setSpecsOpen(true)}
                >
                  <ClipboardList size={16} /> Technical Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="pdp-how">
        <div className="pdp-container">
          <div className="pdp-how-header">
            <span className="pdp-label">Process</span>
            <h2 className="pdp-section-title">From Consultation to Operation in 3 Steps</h2>
          </div>
          <div className="pdp-how-grid">
            {howItWorks.map((item, i) => (
              <div key={i} className="pdp-how-card">
                <span className="pdp-how-step">{item.step}</span>
                <h3 className="pdp-how-title">{item.title}</h3>
                <p className="pdp-how-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ QUALITY ════════ */}
      <section className="pdp-quality">
        <div className="pdp-container">
          <div className="pdp-quality-header">
            <span className="pdp-label">Quality</span>
            <h2 className="pdp-section-title">Tested. Certified. Guaranteed.</h2>
            <p className="pdp-body pdp-body-max">
              Every unit undergoes rigorous testing and certification before delivery,
              ensuring equipment that meets the highest international standards.
            </p>
          </div>
          <div className="pdp-quality-grid">
            {qualityMarks.map((q, i) => (
              <div key={i} className="pdp-quality-card">
                <div className="pdp-quality-check">
                  <Check size={20} />
                </div>
                <h4 className="pdp-quality-label">{q.label}</h4>
                <p className="pdp-quality-desc">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section className="pdp-testimonials">
        <div className="pdp-container">
          <div className="pdp-testimonials-header">
            <span className="pdp-label">Results</span>
            <h2 className="pdp-section-title">Real Impact, Measured in ROI</h2>
          </div>
          <div className="pdp-testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="pdp-testimonial-card">
                <div className="pdp-testimonial-stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="pdp-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="pdp-testimonial-author">
                  <span className="pdp-testimonial-name">{t.name}</span>
                  <span className="pdp-testimonial-role">{t.role}, {t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="pdp-faq">
        <div className="pdp-container pdp-container-narrow">
          <div className="pdp-faq-header">
            <span className="pdp-label">FAQ</span>
            <h2 className="pdp-section-title">Common Questions</h2>
          </div>
          <div className="pdp-faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`pdp-faq-item ${openFaq === i ? 'open' : ''}`}
              >
                <button
                  className="pdp-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="pdp-faq-a">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ BOTTOM CTA ════════ */}
      <section className="pdp-cta">
        <div className="pdp-container pdp-container-narrow">
          <h2 className="pdp-cta-title">Ready to Transform Your Operations?</h2>
          <p className="pdp-cta-body">
            Join 500+ businesses across India running cleaner, quieter, and more
            efficient warehouses with MHE Next electric forklifts.
          </p>
          <div className="pdp-cta-actions">
            <button
              className="pdp-btn pdp-btn-white"
              onClick={() => openForm('Get Started', 'Let\'s find the right forklift for your operation.')}
            >
              Get Started <ArrowRight size={16} />
            </button>
            <button
              className="pdp-btn pdp-btn-ghost"
              onClick={() => openForm('Talk to a Specialist', 'Connect with a material handling expert.')}
            >
              Talk to a Specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
