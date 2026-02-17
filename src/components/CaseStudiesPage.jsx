import { useState } from 'react';
<<<<<<< HEAD
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
=======
import { motion } from 'motion/react';
import { ArrowRight, Building2, TrendingUp, Users, Clock } from 'lucide-react';
import './CaseStudiesPage.css';

const CaseStudiesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'E-commerce', 'Manufacturing', 'Logistics', 'Retail', 'Pharmaceuticals'];

  const caseStudies = [
    {
      id: 1,
      company: 'Amazon India Logistics',
      industry: 'E-commerce',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=80&fit=crop',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80',
      challenge: 'High-volume fulfillment center needed to triple order processing capacity while reducing operational costs during peak season.',
      solution: 'Deployed 45 electric forklifts with IoT fleet management, automated charging stations, and operator training programs across 3 facilities.',
      results: [
        { icon: TrendingUp, value: '180%', label: 'Increase in throughput' },
        { icon: Users, value: '35%', label: 'Labor cost reduction' },
        { icon: Clock, value: '40%', label: 'Faster order cycles' }
      ],
      testimonial: {
        quote: 'MHE Next transformed our operations. The electric fleet reduced our energy costs by 60% and the uptime has been incredible.',
        author: 'Rahul Mehta',
        position: 'Operations Director'
      },
      tags: ['Electric Forklifts', 'Fleet Management', 'Training']
    },
    {
      id: 2,
      company: 'Tata Steel Processing',
      industry: 'Manufacturing',
      logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=80&fit=crop',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80',
      challenge: 'Steel coil handling required heavy-duty equipment capable of moving 8-10 ton loads in extreme industrial environments.',
      solution: 'Implemented 20 heavy-duty 8T and 10T electric forklifts with reinforced masts, custom coil handlers, and 24/7 maintenance support.',
      results: [
        { icon: TrendingUp, value: '99.5%', label: 'Equipment uptime' },
        { icon: Users, value: '45%', label: 'Faster material flow' },
        { icon: Clock, value: '0', label: 'Safety incidents' }
      ],
      testimonial: {
        quote: 'We needed equipment that could handle extreme loads reliably. MHE Next delivered beyond expectations with zero downtime.',
        author: 'Priya Desai',
        position: 'Plant Manager'
      },
      tags: ['Heavy Duty', '8T-10T Forklifts', 'Custom Attachments']
    },
    {
      id: 3,
      company: 'Mahindra Logistics Hub',
      industry: 'Logistics',
      logo: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=200&h=80&fit=crop',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
      challenge: '3PL facility managing 500+ SKUs needed flexible material handling solution with real-time tracking and minimal downtime.',
      solution: 'Supplied 30 electric forklifts (2T-5T) with integrated telematics, operator access control, and preventive maintenance contracts.',
      results: [
        { icon: TrendingUp, value: '250%', label: 'Daily pallet moves' },
        { icon: Users, value: '50%', label: 'Fuel cost savings' },
        { icon: Clock, value: '98%', label: 'On-time delivery rate' }
      ],
      testimonial: {
        quote: 'The fleet management system gave us visibility we never had before. We optimized utilization and cut costs significantly.',
        author: 'Vikram Singh',
        position: 'Logistics Head'
      },
      tags: ['3PL Solutions', 'Telematics', 'Multi-capacity Fleet']
    },
    {
      id: 4,
      company: 'Big Bazaar Distribution',
      industry: 'Retail',
      logo: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=200&h=80&fit=crop',
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80',
      challenge: 'Retail distribution center with narrow aisles and high-density storage needed compact, maneuverable equipment.',
      solution: 'Deployed 15 three-wheel electric forklifts with 1.6m turning radius, reach truck attachments, and night shift training.',
      results: [
        { icon: TrendingUp, value: '65%', label: 'Space utilization gain' },
        { icon: Users, value: '40%', label: 'Faster replenishment' },
        { icon: Clock, value: '8hrs', label: 'Battery runtime' }
      ],
      testimonial: {
        quote: 'The three-wheel design was a game-changer for our tight aisles. We increased racking density without sacrificing speed.',
        author: 'Anjali Reddy',
        position: 'DC Manager'
      },
      tags: ['Three-Wheel', 'Compact Design', 'High-Density Storage']
    },
    {
      id: 5,
      company: 'Cipla Pharmaceuticals',
      industry: 'Pharmaceuticals',
      logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=80&fit=crop',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
      challenge: 'Temperature-controlled pharmaceutical warehouse required zero-emission equipment for GMP compliance and cold storage operation.',
      solution: 'Installed 12 electric forklifts rated for -25°C operation with sealed electronics, condensation-proof batteries, and validation documentation.',
      results: [
        { icon: TrendingUp, value: '99.9%', label: 'Inventory accuracy' },
        { icon: Users, value: '100%', label: 'GMP compliance' },
        { icon: Clock, value: '60%', label: 'Faster cold room ops' }
      ],
      testimonial: {
        quote: 'Zero emissions and cold-rated performance were non-negotiable. MHE Next met all our stringent pharma requirements.',
        author: 'Dr. Suresh Kumar',
        position: 'Quality & Compliance Head'
      },
      tags: ['Pharma Grade', 'Cold Storage', 'Zero Emissions']
    },
    {
      id: 6,
      company: 'ITC Foods Manufacturing',
      industry: 'Manufacturing',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=80&fit=crop',
      image: 'https://images.unsplash.com/photo-1586864387634-3a8e8c8a89e1?w=600&q=80',
      challenge: 'Food production facility needed clean, quiet equipment for ingredient handling in hygiene-controlled zones.',
      solution: 'Provided 18 electric forklifts with washdown-rated electronics, non-marking tires, and HACCP-compliant operation.',
      results: [
        { icon: TrendingUp, value: '70%', label: 'Noise reduction' },
        { icon: Users, value: '55%', label: 'Productivity increase' },
        { icon: Clock, value: 'Zero', label: 'Contamination risks' }
      ],
      testimonial: {
        quote: 'Clean, quiet, and reliable. Perfect for our food-grade facility. The team\'s support has been exceptional.',
        author: 'Meera Iyer',
        position: 'Production Manager'
      },
      tags: ['Food Grade', 'Washdown Rated', 'Low Noise']
    }
  ];

  const filteredStudies = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter(study => study.industry === activeFilter);

  return (
    <div className="case-studies-page">
      {/* Hero Section */}
      <section className="case-studies-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-tag">Success Stories</span>
            <h1 className="hero-title">
              Real results from <span className="text-orange">real businesses</span>
            </h1>
            <p className="hero-subtitle">
              See how leading companies across industries transformed their material handling operations with MHE Next solutions. From small warehouses to industrial giants, our equipment delivers measurable impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <motion.div
            className="filter-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

<<<<<<< HEAD
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
=======
      {/* Case Studies Grid */}
      <section className="case-studies-grid-section">
        <div className="container">
          <div className="case-studies-grid">
            {filteredStudies.map((study, index) => (
              <motion.div
                key={study.id}
                className="case-study-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="card-image">
                  <img src={study.image} alt={study.company} />
                  <div className="industry-badge">{study.industry}</div>
                </div>

                {/* Content */}
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="company-name">
                      <Building2 size={20} />
                      {study.company}
                    </h3>
                  </div>

                  <div className="card-section">
                    <h4 className="section-title">Challenge</h4>
                    <p className="section-text">{study.challenge}</p>
                  </div>

                  <div className="card-section">
                    <h4 className="section-title">Solution</h4>
                    <p className="section-text">{study.solution}</p>
                  </div>

                  <div className="card-section">
                    <h4 className="section-title">Results</h4>
                    <div className="results-grid">
                      {study.results.map((result, idx) => {
                        const Icon = result.icon;
                        return (
                          <div key={idx} className="result-item">
                            <Icon size={20} className="result-icon" />
                            <div className="result-value">{result.value}</div>
                            <div className="result-label">{result.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="card-testimonial">
                    <p className="testimonial-quote">"{study.testimonial.quote}"</p>
                    <div className="testimonial-author">
                      <strong>{study.testimonial.author}</strong>
                      <span>{study.testimonial.position}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="card-tags">
                    {study.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
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
=======
      {/* CTA Section */}
      <section className="case-studies-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="cta-title">Ready to write your success story?</h2>
            <p className="cta-text">
              Join hundreds of companies that trust MHE Next for their material handling needs. Let's discuss how we can transform your operations.
            </p>
            <button className="btn btn-primary btn-large">
              Schedule a consultation
              <ArrowRight size={20} />
            </button>
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
          </motion.div>
        </div>
      </section>
    </div>
  );
<<<<<<< HEAD
}
=======
};

export default CaseStudiesPage;
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
