import { Leaf } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-bg-video"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-main">
          <h1 className="hero-title">
            Customised Handling<br />
            Solutions for Your Business
          </h1>
          <p className="hero-description">
            Industry-leading material handling equipment designed to optimize
            your warehouse operations, boost productivity, and streamline logistics.
          </p>
          <button className="btn btn-primary hero-cta">
            Get a Quote
          </button>
        </div>

        <div className="hero-card">
          <p className="hero-card-label">Trusted by leading warehouses and distribution centers</p>
          <div className="hero-card-image">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80"
              alt="Warehouse with material handling equipment"
            />
          </div>
          <div className="hero-card-stats">
            <div className="hero-stat">
              <span className="hero-stat-label">Equipment units delivered</span>
              <span className="hero-stat-value">10K+</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">Happy clients worldwide</span>
              <span className="hero-stat-value">500+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-icon">
          <Leaf size={20} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
