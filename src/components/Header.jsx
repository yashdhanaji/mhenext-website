import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const products = [
    { name: 'Electric Forklift 2T', href: '/products/electric-forklift' },
    { name: 'Electric Forklift 3T', href: '/products/electric-forklift-3t' },
    { name: 'Electric Forklift 5T', href: '/products/electric-forklift-5t' },
    { name: 'Electric Forklift 8T', href: '/products/electric-forklift-8t' },
    { name: 'Electric Forklift 10T', href: '/products/electric-forklift-10t' },
    { name: 'Three Wheel Forklift', href: '/products/three-wheel-electric-forklift' },
    { name: 'Heli Electric Forklift', href: '/products/heli-make-forklift' },
  ];

  const isProductsPage = location.pathname.startsWith('/products');

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="MHE NXT - Customised Handling Solutions" className="logo-img" />
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li
              className="nav-item-dropdown"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button className={`nav-link nav-link-dropdown ${isProductsPage ? 'active' : ''}`}>
                Products
                <ChevronDown size={16} className={`dropdown-icon ${isProductsOpen ? 'open' : ''}`} />
              </button>
              <div className={`dropdown-menu ${isProductsOpen ? 'open' : ''}`}>
                <div className="dropdown-content">
                  {products.map((product, index) => (
                    <Link
                      key={index}
                      to={product.href}
                      className="dropdown-item"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      {product.name}
                    </Link>
                  ))}
                  <Link
                    to="/products"
                    className="dropdown-item dropdown-item-all"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/case-studies" className={`nav-link ${location.pathname.startsWith('/case-studies') ? 'active' : ''}`}>
                Case studies
              </Link>
            </li>
            <li>
              <Link to="/blog" className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}>
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        <Link to="/#contact" className="btn btn-primary header-cta">
          Contact us
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
