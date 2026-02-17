import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const company = [
<<<<<<< HEAD
    { name: 'About Us', href: '/about', isRoute: true },
=======
    { name: 'About Us', href: '/about' },
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
    { name: 'Careers', href: '#careers' },
    { name: 'News', href: '#news' },
    { name: 'Contact', href: '#contact' }
  ];

  const products = [
    { name: 'Electric Forklifts', href: '/products' },
    { name: 'Diesel Forklifts', href: '/products' },
    { name: 'Reach Trucks', href: '/products' },
    { name: 'Pallet Jacks', href: '/products' }
  ];

  const services = [
    { name: 'Rental Solutions', href: '#rental' },
    { name: 'Maintenance', href: '#maintenance' },
    { name: 'Parts & Support', href: '#support' },
    { name: 'Training', href: '#training' }
  ];

  const resources = [
<<<<<<< HEAD
    { name: 'Case Studies', href: '/case-studies', isRoute: true },
    { name: 'Documentation', href: '#docs' },
    { name: 'Blog', href: '/blog', isRoute: true },
=======
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Documentation', href: '#docs' },
    { name: 'Blog', href: '/blog' },
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
    { name: 'FAQs', href: '#faqs' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo.png" alt="MHE Next" className="footer-logo" />
            <p className="footer-tagline">
              Empowering a sustainable future through world-class material handling solutions.
            </p>
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-newsletter-title">Stay Updated</h4>
            <p className="footer-newsletter-desc">Subscribe to our newsletter for the latest updates.</p>
            <form className="footer-newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="footer-links-section">
          <div className="footer-column">
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-links">
              {company.map((link, index) => (
                <li key={index}>
<<<<<<< HEAD
                  {link.isRoute ? <Link to={link.href}>{link.name}</Link> : <a href={link.href}>{link.name}</a>}
=======
                  {link.href.startsWith('/') ? (
                    <Link to={link.href}>{link.name}</Link>
                  ) : (
                    <a href={link.href}>{link.name}</a>
                  )}
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Products</h4>
            <ul className="footer-links">
              {products.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href}>{link.name}</Link>
                  ) : (
                    <a href={link.href}>{link.name}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Services</h4>
            <ul className="footer-links">
              {services.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Resources</h4>
            <ul className="footer-links">
              {resources.map((link, index) => (
                <li key={index}>
<<<<<<< HEAD
                  {link.isRoute ? <Link to={link.href}>{link.name}</Link> : <a href={link.href}>{link.name}</a>}
=======
                  {link.href.startsWith('/') ? (
                    <Link to={link.href}>{link.name}</Link>
                  ) : (
                    <a href={link.href}>{link.name}</a>
                  )}
>>>>>>> c1d79eeae69779446b8c8d93ca5a4ebea14d67e2
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">© {currentYear} MHE Next. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>

          <div className="footer-social">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
