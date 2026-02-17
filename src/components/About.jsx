<<<<<<< HEAD
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
=======
import { motion } from 'motion/react';
import { Target, Zap, Shield, Leaf } from 'lucide-react';
import './About.css';

const About = () => {
  const timeline = [
    {
      year: '2010',
      title: 'Foundation & Vision',
      description: 'MHE Next was founded with a clear mission: to revolutionize material handling in India by bringing world-class equipment and innovative solutions to warehouses and manufacturing facilities.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'
    },
    {
      year: '2013',
      title: 'Strategic Partnerships',
      description: 'Formed exclusive partnerships with leading global manufacturers, expanding our portfolio to include electric forklifts, reach trucks, and automated guided vehicles.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
    },
    {
      year: '2017',
      title: 'Service Excellence',
      description: 'Launched our 24/7 maintenance and support program, establishing service centers across major industrial hubs to ensure minimal downtime for our clients.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Embraced Industry 4.0 by integrating IoT sensors and fleet management software, enabling clients to optimize operations through real-time data and predictive maintenance.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80'
    },
    {
      year: '2024',
      title: 'Sustainability Focus',
      description: 'Committed to green logistics with a full range of electric and hydrogen-powered equipment, helping clients reduce carbon emissions and achieve sustainability goals.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80'
    }
  ];

  const mission = {
    text: 'To empower businesses across industries with cutting-edge material handling solutions that drive efficiency, safety, and sustainability. We believe that the right equipment, combined with expert support, transforms warehouses into strategic assets that fuel business growth.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80'
  };

  const values = [
    {
      icon: <Target size={28} />,
      title: 'Customer-Centric',
      description: 'Every solution we design starts with understanding your unique operational challenges and business goals.'
    },
    {
      icon: <Zap size={28} />,
      title: 'Innovation-Driven',
      description: 'We continuously seek out the latest technologies and methodologies to keep you ahead of the curve.'
    },
    {
      icon: <Shield size={28} />,
      title: 'Reliability First',
      description: 'Our commitment to quality equipment and responsive service ensures your operations never skip a beat.'
    },
    {
      icon: <Leaf size={28} />,
      title: 'Sustainability',
      description: 'We champion eco-friendly solutions that help you reduce environmental impact without compromising performance.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Chief Executive Officer',
      bio: 'With over 20 years in material handling and logistics, Rajesh leads MHE Next with a vision to transform warehouse operations through innovation and customer-first approach.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      bio: 'Priya oversees our nationwide service network, ensuring every client receives prompt, expert support. Her focus on operational excellence drives our 98% customer satisfaction rate.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
    },
    {
      name: 'Vikram Patel',
      role: 'Technical Director',
      bio: 'A certified engineer with expertise in automation and robotics, Vikram leads our custom solutions division, designing tailored systems for complex warehousing challenges.',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80'
    },
    {
      name: 'Anjali Desai',
      role: 'Business Development Head',
      bio: 'Anjali drives strategic partnerships and market expansion. Her deep industry connections and client relationship skills have been key to our growth across sectors.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80'
    },
    {
      name: 'Arjun Reddy',
      role: 'Service Manager',
      bio: 'Leading our team of certified technicians, Arjun ensures our maintenance programs deliver maximum uptime. His hands-on approach keeps our service standards industry-leading.',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80'
    },
    {
      name: 'Sneha Iyer',
      role: 'Sustainability Lead',
      bio: 'Sneha champions our green initiatives, guiding clients toward eco-friendly equipment choices and helping them achieve carbon reduction targets without sacrificing productivity.',
      photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80'
    }
  ];

  return (
    <div className="about-page">
      {/* Company History Section */}
      <section className="about-history section">
        <div className="container">
          <motion.div
            className="about-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Our Journey</span>
            <h2 className="about-title">
              Building the future of<br />
              <span className="text-orange">material handling</span>
            </h2>
            <p className="about-subtitle">
              From a small startup to India's trusted partner in warehouse solutions, our journey is defined by innovation, dedication, and a relentless focus on customer success.
            </p>
          </motion.div>

          <motion.div
            className="timeline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated timeline line */}
            <motion.div
              className="timeline-line-animated"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1.5,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            />

            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <motion.div
                  className="timeline-marker"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: index * 0.15
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <span className="timeline-year">{item.year}</span>
                </motion.div>
                <motion.div
                  className="timeline-content"
                  initial={{ opacity: 0, x: 100, rotateY: -15 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.15 + 0.1
                  }}
                >
                  <motion.div
                    className="timeline-card"
                    whileHover={{
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    {item.image && (
                      <motion.div
                        className="timeline-image"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                      >
                        <img src={item.image} alt={item.title} />
                      </motion.div>
                    )}
                    <div className="timeline-text">
                      <motion.h3
                        className="timeline-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        className="timeline-description"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="about-mission section">
        <div className="container">
          <motion.div
            className="mission-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Mission & Values</span>
            <h2 className="mission-title">
              What <span className="text-orange">drives us</span> forward
            </h2>
          </motion.div>

          <div className="mission-grid">
            <motion.div
              className="mission-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="mission-heading">Our Mission</h3>
              <p className="mission-text">{mission.text}</p>
              <div className="mission-image">
                <img src={mission.image} alt="Our mission" />
              </div>
            </motion.div>

            <motion.div
              className="values-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="values-heading">Our Values</h3>
              <div className="values-list">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="value-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="value-icon">{value.icon}</div>
                    <div className="value-text">
                      <h4 className="value-title">{value.title}</h4>
                      <p className="value-description">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team section">
        <div className="container">
          <motion.div
            className="team-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Our Team</span>
            <h2 className="team-title">
              Meet the people behind<br />
              <span className="text-orange">MHE Next</span>
            </h2>
            <p className="team-subtitle">
              Our leadership team brings decades of combined experience in material handling, logistics, and customer service.
            </p>
          </motion.div>

          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="team-photo">
                  <img src={member.photo} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
        </div>
      </section>
    </div>
  );
<<<<<<< HEAD
}
=======
};

export default About;
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
