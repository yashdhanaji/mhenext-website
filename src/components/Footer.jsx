import { Forklift, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const pages = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  return (
    <footer className="footer">
      <div className="footer-bg">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
          alt="Warehouse"
        />
        <div className="footer-overlay" />
      </div>

      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/logo.png" alt="MHE Next" className="footer-logo-img" />
          </div>
          <h3 className="footer-tagline">
            Empowering your <span>operations</span> with<br />
            world-class handling solutions.
          </h3>
          <p className="footer-subscribe-text">Subscribe to our newsletter</p>
          <form className="footer-subscribe">
            <input type="email" placeholder="Enter your email" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
          <p className="footer-credits">
            © 2024 MHE Next. All rights reserved.
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-columns">
            <div className="footer-column">
              <h4 className="footer-column-title">Quick Links</h4>
              <ul className="footer-links">
                {pages.map((page, index) => (
                  <li key={index}>
                    <a href={page.href}>{page.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Head Office</h4>
              <p className="footer-address">
                MHE Next Pvt. Ltd.<br />
                Industrial Area, Phase 2<br />
                Mumbai, Maharashtra 400001
              </p>
              <p className="footer-address">
                Branch Office:<br />
                Logistics Park, Sector 18<br />
                Gurugram, Haryana 122001
              </p>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Contact Us</h4>
              <p className="footer-contact">info@mhenext.com</p>
              <p className="footer-contact">+91 98765 43210</p>
              <p className="footer-contact">+91 11 2345 6789</p>

              <h4 className="footer-column-title" style={{ marginTop: '32px' }}>Follow Us</h4>
              <div className="footer-social">
                <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
                <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
