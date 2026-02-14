import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { productCategories } from '../data/products';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const location = useLocation();

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
              <div className={`dropdown-menu dropdown-menu-mega ${isProductsOpen ? 'open' : ''}`}>
                <div className="dropdown-content-mega">
                  {/* Categories Column */}
                  <div className="dropdown-categories">
                    {productCategories.map((category, index) => (
                      <div
                        key={category.category}
                        className={`category-item ${activeCategoryIndex === index ? 'active' : ''}`}
                        onMouseEnter={() => setActiveCategoryIndex(index)}
                      >
                        <span>{category.category}</span>
                        <ChevronRight size={16} className="category-arrow" />
                      </div>
                    ))}
                    <Link
                      to="/products"
                      className="category-item category-item-all"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <span>View All Products</span>
                    </Link>
                  </div>

                  {/* Products Column */}
                  <div className="dropdown-products">
                    {productCategories[activeCategoryIndex]?.products.map((product, index) => (
                      <Link
                        key={index}
                        to={product.link}
                        className="product-item"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/case-studies" className={`nav-link ${location.pathname === '/case-studies' ? 'active' : ''}`}>
                Case studies
              </Link>
            </li>
            <li>
              <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>
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
