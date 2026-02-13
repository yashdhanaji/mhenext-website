import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import '@google/model-viewer';
import {
  ChevronRight, ArrowRight, ArrowLeft, Box, Share2,
  Shield, Award, Zap, Settings, Star, Download,
  Check, X, Battery, Gauge, Leaf, Wrench, Clock,
  Truck, Package, Factory, Warehouse
} from 'lucide-react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import FormModal from './FormModal';
import { productDataMap, resolveIcon } from '../data/products';
import './ProductDetail.css';

const tabs = ['Specifications', 'Features', 'Applications', 'Downloads'];

export default function ProductDetail() {
  const { slug } = useParams();
  const productData = productDataMap[slug];

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [formModal, setFormModal] = useState({ open: false, title: '', subtitle: '' });
  const [showToast, setShowToast] = useState(false);

  const viewerRef = useRef(null);

  // Reset state when slug changes
  useEffect(() => {
    setActiveImage(0);
    setActiveTab(0);
    setViewerOpen(false);
    window.scrollTo(0, 0);
  }, [slug]);

  useOutsideClick(viewerRef, () => {
    if (viewerOpen) setViewerOpen(false);
  });

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setViewerOpen(false);
    }
    if (viewerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [viewerOpen]);

  // 404 state
  if (!productData) {
    return (
      <div className="pd">
        <div className="pd-glow pd-glow-1" />
        <div className="pd-glow pd-glow-2" />
        <section className="pd-hero" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
          <motion.h1
            className="pd-hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Product Not Found
          </motion.h1>
          <motion.p
            className="pd-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            The product you're looking for doesn't exist or has been moved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/products" className="pd-back-link" style={{ display: 'inline-flex', marginTop: '2rem' }}>
              <ArrowLeft size={16} />
              Browse All Products
            </Link>
          </motion.div>
        </section>
      </div>
    );
  }

  // Resolve related products from slugs
  const relatedProducts = (productData.relatedSlugs || [])
    .map((s) => productDataMap[s])
    .filter(Boolean);

  const openForm = (title, subtitle = '') => {
    setFormModal({ open: true, title, subtitle });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  return (
    <div className="pd">
      {/* Background glow orbs (matches homepage) */}
      <div className="pd-glow pd-glow-1" />
      <div className="pd-glow pd-glow-2" />
      <div className="pd-glow pd-glow-3" />
      <div className="pd-glow pd-glow-4" />
      <div className="pd-glow pd-glow-5" />
      <div className="pd-glow pd-glow-6" />

      <FormModal
        isOpen={formModal.open}
        onClose={() => setFormModal({ open: false, title: '', subtitle: '' })}
        title={formModal.title}
        subtitle={formModal.subtitle}
      />

      {/* ════════ SECTION 1: HERO ════════ */}
      <section className="pd-hero">
        <motion.div
          className="pd-breadcrumb"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to="/">HOME</Link>
          <ChevronRight size={12} />
          <Link to="/products">PRODUCTS</Link>
          <ChevronRight size={12} />
          <span>{productData.name.toUpperCase()}</span>
        </motion.div>

        <motion.h1
          className="pd-hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {productData.name}
        </motion.h1>

        <motion.p
          className="pd-hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {productData.description}
        </motion.p>

        <motion.div
          className="pd-hero-specs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          {productData.quickSpecs.map((spec, i) => (
            <div key={i} className="pd-hero-spec">
              <span className="pd-hero-spec-value">{spec.value}</span>
              <span className="pd-hero-spec-label">{spec.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="pd-hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <button
            className="pd-btn pd-btn-primary"
            onClick={() => openForm('Request a Quote', 'Tell us your requirements and we\'ll prepare a custom quote.')}
          >
            REQUEST QUOTE
          </button>
          {productData.has3DModel && (
            <button
              className="pd-btn pd-btn-outline"
              onClick={() => setViewerOpen(true)}
            >
              <Box size={16} />
              VIEW 3D MODEL
            </button>
          )}
        </motion.div>
      </section>

      {/* ════════ SECTION 2: MAIN PRODUCT ════════ */}
      <section className="pd-main">
        <div className="pd-container">
          <div className="pd-main-grid">
            {/* Left: Gallery */}
            <div className="pd-gallery">
              <motion.div
                className="pd-gallery-main"
                key={`${slug}-${activeImage}`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={productData.images[activeImage]}
                  alt={`${productData.name} view ${activeImage + 1}`}
                />
                <div className="pd-gallery-overlay">
                  {productData.has3DModel && (
                    <button
                      className="pd-gallery-overlay-btn"
                      onClick={() => setViewerOpen(true)}
                      title="View 3D Model"
                    >
                      <Box size={18} />
                    </button>
                  )}
                  <button
                    className="pd-gallery-overlay-btn"
                    onClick={handleShare}
                    title="Share"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </motion.div>
              <div className="pd-gallery-thumbs">
                {productData.images.map((img, i) => (
                  <div
                    key={i}
                    className={`pd-gallery-thumb ${activeImage === i ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img} alt={`Thumb ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="pd-info">
              <div className="pd-info-eyebrow">{productData.eyebrow}</div>
              <h2 className="pd-info-title">{productData.name}</h2>
              <p className="pd-info-desc">{productData.description}</p>

              {/* Specs */}
              <div className="pd-specs-list">
                {productData.specs.map((spec, i) => (
                  <div key={i} className="pd-spec-row">
                    <span className="pd-spec-label">{spec.label}</span>
                    <span className="pd-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Key Features */}
              <div className="pd-features-title">Key Features</div>
              <div className="pd-features-list">
                {productData.features.map((feat, i) => (
                  <div key={i} className="pd-feature-item">
                    <Check size={16} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Application Tags */}
              <div className="pd-tags">
                {productData.applications.map((app, i) => (
                  <span key={i} className="pd-tag">{app}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="pd-info-actions">
                <button
                  className="pd-btn pd-btn-primary"
                  onClick={() => openForm('Request a Quote', 'Tell us your requirements and we\'ll prepare a custom quote.')}
                >
                  REQUEST QUOTE <ArrowRight size={16} />
                </button>
                <button
                  className="pd-btn pd-btn-outline"
                  onClick={() => openForm('Download Brochure', 'Enter your details and we\'ll send the brochure to your email.')}
                >
                  <Download size={16} />
                  DOWNLOAD BROCHURE
                </button>
              </div>

              {/* Trust */}
              <div className="pd-trust">
                <div className="pd-trust-item">
                  <Shield size={16} />
                  <span>3-Year Warranty</span>
                </div>
                <div className="pd-trust-item">
                  <Award size={16} />
                  <span>ISO 9001 Certified</span>
                </div>
                <div className="pd-trust-item">
                  <Truck size={16} />
                  <span>Pan-India Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3: TABBED INFORMATION ════════ */}
      <section className="pd-tabs-section">
        <div className="pd-container">
          <div className="pd-tabs-nav">
            {tabs.map((tab, i) => (
              <button
                key={i}
                className={`pd-tab-btn ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${slug}-${activeTab}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Tab: Specifications */}
              {activeTab === 0 && (
                <div className="pd-tab-specs-grid">
                  {productData.fullSpecs.map((spec, i) => (
                    <div key={i} className="pd-tab-spec-card">
                      <div className="pd-tab-spec-card-label">{spec.label}</div>
                      <div className="pd-tab-spec-card-value">{spec.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Features */}
              {activeTab === 1 && (
                <div className="pd-tab-features-grid">
                  {productData.fullFeatures.map((feat, i) => {
                    const Icon = resolveIcon(feat.icon);
                    return (
                      <div key={i} className="pd-tab-feature-card">
                        <div className="pd-tab-feature-icon">
                          <Icon size={22} />
                        </div>
                        <div>
                          <div className="pd-tab-feature-title">{feat.title}</div>
                          <div className="pd-tab-feature-desc">{feat.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab: Applications */}
              {activeTab === 2 && (
                <div className="pd-tab-apps-grid">
                  {productData.fullApplications.map((app, i) => {
                    const Icon = resolveIcon(app.icon);
                    return (
                      <div key={i} className="pd-tab-app-card">
                        <div className="pd-tab-app-icon">
                          <Icon size={24} />
                        </div>
                        <div className="pd-tab-app-name">{app.name}</div>
                        <div className="pd-tab-app-desc">{app.desc}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab: Downloads */}
              {activeTab === 3 && (
                <div className="pd-tab-downloads-list">
                  {productData.downloads.map((dl, i) => (
                    <div
                      key={i}
                      className="pd-tab-download-item"
                      onClick={() => openForm('Download ' + dl.name, 'Enter your details and we\'ll send the document to your email.')}
                    >
                      <div className="pd-tab-download-info">
                        <div className="pd-tab-download-icon">
                          <Download size={18} />
                        </div>
                        <div>
                          <div className="pd-tab-download-name">{dl.name}</div>
                          <div className="pd-tab-download-size">{dl.size}</div>
                        </div>
                      </div>
                      <div className="pd-tab-download-arrow">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════════ SECTION 4: RELATED PRODUCTS ════════ */}
      <section className="pd-related">
        <div className="pd-container">
          <div className="pd-related-header">
            <div className="pd-label">Explore More</div>
            <h2 className="pd-section-title">Related Products</h2>
          </div>

          <div className="pd-related-grid">
            {relatedProducts.map((product, i) => (
              <Link key={product.slug} to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  className="pd-related-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="pd-related-card-image">
                    <img src={product.images[0]} alt={product.name} />
                    <div className="pd-related-card-overlay" />
                    <div className="pd-related-card-badges">
                      {product.badges.map((badge, j) => (
                        <span key={j} className="pd-related-card-badge">{badge}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pd-related-card-body">
                    <div className="pd-related-card-name">{product.name}</div>
                    <div className="pd-related-card-desc">{product.shortDesc}</div>
                    <div className="pd-related-card-specs">
                      {product.quickSpecs.slice(0, 3).map((spec, j) => (
                        <span key={j} className="pd-related-card-spec">{spec.value} {spec.label}</span>
                      ))}
                    </div>
                    <span className="pd-related-card-link">
                      VIEW DETAILS <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 5: BACK NAVIGATION ════════ */}
      <section className="pd-back">
        <Link to="/products" className="pd-back-link">
          <ArrowLeft size={16} />
          Back to All Products
        </Link>
      </section>

      {/* ════════ SECTION 6: 3D VIEWER MODAL ════════ */}
      {productData.has3DModel && (
        <AnimatePresence>
          {viewerOpen && (
            <motion.div
              className="pd-viewer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={viewerRef}
                className="pd-viewer-modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="pd-viewer-header">
                  <span className="pd-viewer-title">3D Model Viewer</span>
                  <button className="pd-viewer-close" onClick={() => setViewerOpen(false)}>
                    <X size={18} />
                  </button>
                </div>
                <div className="pd-viewer-body">
                  <model-viewer
                    src="/forklift-model.glb"
                    alt={`${productData.name} 3D Model`}
                    camera-controls
                    auto-rotate
                    shadow-intensity="1"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Share Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="pd-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Check size={16} />
            Link copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
