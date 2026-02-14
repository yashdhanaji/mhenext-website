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
        </div>
      </section>
    </div>
  );
};

export default About;
