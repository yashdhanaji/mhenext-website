import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const products = [
    { name: 'Electric Counterbalance Forklift', href: '/products/electric-forklift' },
    { name: 'Reach Truck', href: '/products/reach-truck' },
    { name: 'Pallet Truck', href: '/products/pallet-truck' },
    { name: 'Order Picker', href: '/products/order-picker' },
    { name: 'Stacker', href: '/products/stacker' },
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
                </div>
              </div>
            </li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#case-studies" className="nav-link">Case studies</a></li>
            <li><a href="#blog" className="nav-link">Blog</a></li>
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
