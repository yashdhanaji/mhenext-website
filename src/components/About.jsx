import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, Shield, Leaf, Zap, Users, Globe, Award } from 'lucide-react';
import './About.css';

const stats = [
  { value: '15+', label: 'Years of experience' },
  { value: '500+', label: 'Clients served' },
  { value: '20+', label: 'States across India' },
  { value: '5,000+', label: 'Units deployed' },
];

const values = [
  {
    icon: Shield,
    title: 'Safety first',
    desc: 'Every product we supply meets or exceeds the relevant Indian and international safety standards. We don\'t compromise on operator safety, ever.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'Our all-electric portfolio is guided by a genuine commitment to reducing industrial carbon emissions — not just following regulation.',
  },
  {
    icon: Zap,
    title: 'Performance',
    desc: 'Our clients operate in demanding, round-the-clock environments. We engineer our solutions to deliver consistent uptime and productivity.',
  },
  {
    icon: Users,
    title: 'Partnership',
    desc: 'We don\'t sell equipment — we build long-term operational partnerships. Our team stays involved from specification through the entire service lifecycle.',
  },
  {
    icon: Globe,
    title: 'Global expertise, local knowledge',
    desc: 'We combine world-class forklift technology with deep understanding of Indian warehousing conditions, regulatory norms, and operational realities.',
  },
  {
    icon: Award,
    title: 'Service excellence',
    desc: 'With trained service engineers in every major metro, we guarantee fast response times and maximum fleet uptime for our clients.',
  },
];

const timeline = [
  {
    year: '2008',
    title: 'Founded in Mumbai',
    desc: 'MHE Next was established with a single mission: bring world-class material handling technology to the Indian market with genuine after-sales support.',
  },
  {
    year: '2012',
    title: 'Electric-first pivot',
    desc: 'Well ahead of the industry trend, we made a strategic decision to focus exclusively on electric material handling equipment — betting on the future of sustainable logistics.',
  },
  {
    year: '2016',
    title: 'National service network',
    desc: 'Established dedicated service centers in Mumbai, Delhi, Bengaluru, and Hyderabad — enabling 24-hour response times across our client base.',
  },
  {
    year: '2019',
    title: 'Heavy capacity expansion',
    desc: 'Launched our 8T and 10T electric forklift range, addressing the heavy-industrial and port logistics market for the first time.',
  },
  {
    year: '2022',
    title: 'Digital fleet management',
    desc: 'Rolled out our IoT-enabled fleet telematics platform — giving clients real-time visibility into utilization, battery health, and predictive maintenance alerts.',
  },
  {
    year: '2024',
    title: '500+ clients milestone',
    desc: 'Reached 500 active client accounts across 20+ Indian states, spanning e-commerce, pharmaceutical, automotive, and cold chain sectors.',
  },
];

export default function About() {
  return (
    <div className="about">
      <div className="about-glow about-glow-1" />
      <div className="about-glow about-glow-2" />
      <div className="about-glow about-glow-3" />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-container">
          <motion.div
            className="about-breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/">HOME</Link>
            <ChevronRight size={12} />
            <span>ABOUT</span>
          </motion.div>

          <div className="about-hero-inner">
            <motion.div
              className="about-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="section-tag">About MHE Next</span>
              <h1 className="about-hero-title">
                Driving the shift to<br />smarter, cleaner<br />material handling
              </h1>
              <p className="about-hero-desc">
                We are India's specialist in electric material handling equipment — combining world-class forklift technology with local engineering expertise to help operations run smarter, safer, and more sustainably.
              </p>
              <div className="about-hero-actions">
                <Link to="/products" className="btn btn-primary">
                  Explore products <ArrowRight size={16} />
                </Link>
                <Link to="/case-studies" className="btn btn-outline">
                  View case studies
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="about-hero-image"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80"
                alt="MHE Next warehouse operations"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="about-container">
          <motion.div
            className="about-stats-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="about-stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-container">
          <div className="about-mission-inner">
            <motion.div
              className="about-mission-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag">Our mission</span>
              <h2 className="about-mission-title">
                Making world-class material handling accessible to every Indian operation
              </h2>
              <p className="about-mission-desc">
                When we started MHE Next in 2008, world-class electric forklifts were available in India — but the local expertise to deploy, maintain, and optimise them wasn't. Companies were buying expensive equipment without the support infrastructure to get the most out of it.
              </p>
              <p className="about-mission-desc">
                We built MHE Next to close that gap: bringing together the best electric forklift technology with a deeply experienced local team capable of handling everything from needs assessment to 24-hour field service. Today, our clients trust us not just as an equipment supplier, but as a long-term operational partner.
              </p>
            </motion.div>

            <motion.div
              className="about-mission-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80"
                alt="Warehouse operations"
              />
              <div className="about-mission-badge">
                <span className="about-mission-badge-year">2008</span>
                <span className="about-mission-badge-label">Founded in<br />Mumbai</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="about-container">
          <motion.div
            className="about-timeline-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-tag">Our journey</span>
            <h2 className="about-section-title">16 years of building<br />something that lasts</h2>
          </motion.div>

          <div className="about-timeline-list">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="about-timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="about-timeline-year">{item.year}</div>
                <div className="about-timeline-connector">
                  <div className="about-timeline-dot" />
                  <div className="about-timeline-line" />
                </div>
                <div className="about-timeline-content">
                  <h3 className="about-timeline-title">{item.title}</h3>
                  <p className="about-timeline-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-container">
          <motion.div
            className="about-values-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-tag">What we stand for</span>
            <h2 className="about-section-title">The principles that<br />guide everything we do</h2>
          </motion.div>

          <div className="about-values-grid">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  className="about-value-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="about-value-icon">
                    <Icon size={22} />
                  </div>
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-desc">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-container">
          <motion.div
            className="about-cta-inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Get in touch</span>
            <h2 className="about-cta-title">Ready to work together?</h2>
            <p className="about-cta-desc">
              Whether you need a single unit or a complete fleet transformation, our team is ready to help you find the right solution.
            </p>
            <div className="about-cta-actions">
              <Link to="/#contact" className="btn btn-primary about-cta-btn">
                Contact us <ArrowRight size={16} />
              </Link>
              <Link to="/products" className="btn btn-outline about-cta-btn-outline">
                Browse products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
