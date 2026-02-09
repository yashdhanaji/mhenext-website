import { useState } from 'react';
import { ChevronLeft, ChevronRight, Forklift, Cog, Wrench } from 'lucide-react';
import './Services.css';

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      icon: <Forklift size={32} />,
      title: 'Equipment Sales',
      description: 'Wide range of forklifts, pallet trucks, stackers, and warehouse equipment from leading brands.',
      illustration: 'equipment'
    },
    {
      icon: <Wrench size={32} />,
      title: 'Maintenance & Repair',
      description: 'Comprehensive maintenance programs and 24/7 repair services to minimize downtime.',
      illustration: 'maintenance'
    },
    {
      icon: <Cog size={32} />,
      title: 'Custom Solutions',
      description: 'Tailored material handling systems designed specifically for your operational needs.',
      illustration: 'custom'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="services">
      <div className="container">
        <div className="services-header">
          <div className="services-header-left">
            <span className="section-tag section-tag-dark">Our Services</span>
            <h2 className="services-title">
              Complete material<br />
              handling <span className="text-orange">solutions</span>
            </h2>
          </div>
          <div className="services-nav">
            <button className="nav-btn" onClick={prevSlide} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button className="nav-btn" onClick={nextSlide} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <button className="btn btn-outline-dark service-btn">
                Learn more
              </button>
              <div className="service-illustration">
                {service.illustration === 'equipment' && (
                  <svg viewBox="0 0 300 100" className="illustration">
                    <rect x="80" y="30" width="60" height="50" rx="4" fill="none" stroke="rgba(235, 108, 47, 0.3)" strokeWidth="2"/>
                    <rect x="140" y="50" width="40" height="30" rx="2" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <circle cx="100" cy="90" r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <circle cx="160" cy="90" r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <line x1="80" y1="30" x2="80" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <line x1="60" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  </svg>
                )}
                {service.illustration === 'maintenance' && (
                  <svg viewBox="0 0 300 100" className="illustration">
                    <circle cx="150" cy="50" r="30" fill="none" stroke="rgba(235, 108, 47, 0.3)" strokeWidth="2"/>
                    <path d="M135 50 L145 60 L165 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                    <circle cx="80" cy="70" r="15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <circle cx="220" cy="70" r="15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <line x1="95" y1="70" x2="120" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3"/>
                    <line x1="180" y1="50" x2="205" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3"/>
                  </svg>
                )}
                {service.illustration === 'custom' && (
                  <svg viewBox="0 0 300 100" className="illustration">
                    <rect x="60" y="40" width="50" height="40" rx="4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <rect x="125" y="30" width="50" height="50" rx="4" fill="none" stroke="rgba(235, 108, 47, 0.3)" strokeWidth="2"/>
                    <rect x="190" y="45" width="50" height="35" rx="4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <line x1="110" y1="60" x2="125" y2="55" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <line x1="175" y1="55" x2="190" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
