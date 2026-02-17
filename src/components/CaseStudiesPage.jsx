import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, MapPin, Clock, Building2 } from 'lucide-react';
import { caseStudies, industryFilters } from '../data/caseStudies';
import './CaseStudiesPage.css';

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? caseStudies
      : caseStudies.filter((cs) => cs.industry === activeFilter);

  return (
    <div className="csp">
      <div className="csp-glow csp-glow-1" />
      <div className="csp-glow csp-glow-2" />
      <div className="csp-glow csp-glow-3" />

      {/* Hero */}
      <section className="csp-hero">
        <motion.div
          className="csp-breadcrumb"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to="/">HOME</Link>
          <ChevronRight size={12} />
          <span>CASE STUDIES</span>
        </motion.div>

        <motion.h1
          className="csp-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Real results,<br />real operations
        </motion.h1>

        <motion.p
          className="csp-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          From e-commerce fulfillment to pharmaceutical cold chains — see how MHE Next has transformed material handling across industries.
        </motion.p>

        <motion.div
          className="csp-hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { value: '120+', label: 'Projects completed' },
            { value: '85+', label: 'Clients served' },
            { value: '12', label: 'Industries covered' },
          ].map((stat, i) => (
            <div key={i} className="csp-hero-stat">
              <span className="csp-hero-stat-value">{stat.value}</span>
              <span className="csp-hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Filters */}
      <section className="csp-filters-section">
        <div className="csp-container">
          <motion.div
            className="csp-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {industryFilters.map((filter) => (
              <button
                key={filter}
                className={`csp-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="csp-grid-section">
        <div className="csp-container">
          <div className="csp-grid">
            {filtered.map((study, index) => (
              <motion.div
                key={study.slug}
                className="csp-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
              >
                <div className="csp-card-image">
                  <img src={study.thumbnail} alt={study.title} />
                  <span className="csp-card-industry">{study.industry}</span>
                </div>

                <div className="csp-card-body">
                  <div className="csp-card-meta">
                    <span className="csp-card-meta-item">
                      <Building2 size={13} />
                      {study.client}
                    </span>
                    <span className="csp-card-meta-item">
                      <MapPin size={13} />
                      {study.location}
                    </span>
                    <span className="csp-card-meta-item">
                      <Clock size={13} />
                      {study.duration}
                    </span>
                  </div>

                  <h3 className="csp-card-title">{study.title}</h3>
                  <p className="csp-card-excerpt">{study.excerpt}</p>

                  <div className="csp-card-stats">
                    {study.stats.slice(0, 2).map((stat, i) => (
                      <div key={i} className="csp-card-stat">
                        <span className="csp-card-stat-value">{stat.value}</span>
                        <span className="csp-card-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={`/case-studies/${study.slug}`} className="csp-card-link">
                    View case study
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="csp-cta">
        <div className="csp-container">
          <motion.div
            className="csp-cta-inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Work with us</span>
            <h2 className="csp-cta-title">Ready to write your success story?</h2>
            <p className="csp-cta-desc">
              Tell us about your operation and we'll design a material handling solution that delivers measurable results.
            </p>
            <Link to="/#contact" className="btn btn-primary csp-cta-btn">
              Start a conversation
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
