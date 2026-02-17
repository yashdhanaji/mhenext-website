import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ArrowLeft, MapPin, Clock, Building2, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { getCaseStudyBySlug, caseStudies } from '../data/caseStudies';
import './CaseStudyDetail.css';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return (
      <div className="csd-not-found">
        <h2>Case study not found</h2>
        <Link to="/case-studies" className="btn btn-primary">Back to Case Studies</Link>
      </div>
    );
  }

  const related = caseStudies.filter((cs) => cs.slug !== slug).slice(0, 2);

  return (
    <div className="csd">
      <div className="csd-glow csd-glow-1" />
      <div className="csd-glow csd-glow-2" />

      {/* Hero */}
      <section className="csd-hero">
        <div className="csd-container">
          <motion.div
            className="csd-breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/">HOME</Link>
            <ChevronRight size={12} />
            <Link to="/case-studies">CASE STUDIES</Link>
            <ChevronRight size={12} />
            <span>{study.industry.toUpperCase()}</span>
          </motion.div>

          <motion.div
            className="csd-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="section-tag">{study.industry}</span>
            <h1 className="csd-hero-title">{study.title}</h1>
            <p className="csd-hero-excerpt">{study.excerpt}</p>

            <div className="csd-hero-meta">
              <div className="csd-meta-item">
                <Building2 size={16} />
                <span>{study.client}</span>
              </div>
              <div className="csd-meta-item">
                <MapPin size={16} />
                <span>{study.location}</span>
              </div>
              <div className="csd-meta-item">
                <Clock size={16} />
                <span>{study.duration}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="csd-hero-image"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img src={study.heroImage} alt={study.title} />
          <div className="csd-hero-image-overlay" />
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="csd-stats-bar">
        <div className="csd-container">
          <motion.div
            className="csd-stats-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {study.stats.map((stat, i) => (
              <div key={i} className="csd-stat">
                <span className="csd-stat-value">{stat.value}</span>
                <span className="csd-stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="csd-body">
        <div className="csd-container">
          <div className="csd-body-grid">
            {/* Main content */}
            <div className="csd-main">
              <motion.div
                className="csd-section-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="csd-section-title">The challenge</h2>
                <p className="csd-section-text">{study.challenge}</p>
              </motion.div>

              <motion.div
                className="csd-section-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="csd-section-title">Our solution</h2>
                <p className="csd-section-text">{study.solution}</p>
              </motion.div>

              <motion.div
                className="csd-section-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="csd-section-title">Results achieved</h2>
                <ul className="csd-results-list">
                  {study.results.map((result, i) => (
                    <motion.li
                      key={i}
                      className="csd-result-item"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <CheckCircle2 size={18} className="csd-result-icon" />
                      {result}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {study.gallery && study.gallery.length > 0 && (
                <motion.div
                  className="csd-gallery"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="csd-section-title">Gallery</h2>
                  <div className="csd-gallery-grid">
                    {study.gallery.map((img, i) => (
                      <div key={i} className="csd-gallery-item">
                        <img src={img} alt={`${study.title} - ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="csd-sidebar">
              <motion.div
                className="csd-sidebar-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="csd-sidebar-title">Equipment used</h3>
                <ul className="csd-equipment-list">
                  {study.equipment.map((item, i) => (
                    <li key={i} className="csd-equipment-item">
                      <Wrench size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="csd-sidebar-card csd-sidebar-cta"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="csd-sidebar-cta-title">Want similar results?</h3>
                <p className="csd-sidebar-cta-text">
                  Talk to our team about your operation and we'll design a custom solution.
                </p>
                <Link to="/#contact" className="btn btn-primary csd-sidebar-btn">
                  Get in touch
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="csd-related">
          <div className="csd-container">
            <h2 className="csd-related-title">More case studies</h2>
            <div className="csd-related-grid">
              {related.map((cs, i) => (
                <motion.div
                  key={cs.slug}
                  className="csd-related-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="csd-related-image">
                    <img src={cs.thumbnail} alt={cs.title} />
                    <span className="csd-related-industry">{cs.industry}</span>
                  </div>
                  <div className="csd-related-body">
                    <h3 className="csd-related-card-title">{cs.title}</h3>
                    <Link to={`/case-studies/${cs.slug}`} className="csd-related-link">
                      View case study <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
