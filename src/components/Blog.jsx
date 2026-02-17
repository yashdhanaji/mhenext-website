import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, Clock, User } from 'lucide-react';
import { blogPosts, getFeaturedPost, blogCategories } from '../data/blog';
import './Blog.css';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const featured = getFeaturedPost();

  const filtered =
    activeCategory === 'All'
      ? blogPosts.filter((p) => !p.featured)
      : blogPosts.filter((p) => p.category === activeCategory && !p.featured);

  const allFiltered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="blog">
      <div className="blog-glow blog-glow-1" />
      <div className="blog-glow blog-glow-2" />
      <div className="blog-glow blog-glow-3" />

      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-container">
          <motion.div
            className="blog-breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/">HOME</Link>
            <ChevronRight size={12} />
            <span>BLOG</span>
          </motion.div>

          <motion.h1
            className="blog-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Insights &amp; ideas
          </motion.h1>

          <motion.p
            className="blog-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Industry analysis, technical guides, and operational expertise — from the MHE Next team.
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && activeCategory === 'All' && (
        <section className="blog-featured-section">
          <div className="blog-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link to={`/blog/${featured.slug}`} className="blog-featured-card">
                <div className="blog-featured-image">
                  <img src={featured.heroImage} alt={featured.title} />
                  <span className="blog-featured-badge">Featured</span>
                </div>
                <div className="blog-featured-content">
                  <div className="blog-featured-meta">
                    <span className="blog-category-tag">{featured.category}</span>
                    <span className="blog-meta-sep">·</span>
                    <span className="blog-date">{featured.date}</span>
                    <span className="blog-meta-sep">·</span>
                    <span className="blog-read-time">
                      <Clock size={13} />
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="blog-featured-title">{featured.title}</h2>
                  <p className="blog-featured-excerpt">{featured.excerpt}</p>
                  <div className="blog-featured-footer">
                    <div className="blog-author">
                      <div className="blog-author-avatar">
                        {featured.author.name[0]}
                      </div>
                      <div className="blog-author-info">
                        <span className="blog-author-name">{featured.author.name}</span>
                        <span className="blog-author-role">{featured.author.role}</span>
                      </div>
                    </div>
                    <span className="blog-read-more">
                      Read article <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters + Grid */}
      <section className="blog-grid-section">
        <div className="blog-container">
          <motion.div
            className="blog-filters"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {blogCategories.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="blog-grid">
            {allFiltered.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.07, duration: 0.5 }}
              >
                <Link to={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-image">
                    <img src={post.thumbnail} alt={post.title} />
                    <span className="blog-card-category">{post.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-date">{post.date}</span>
                      <span className="blog-meta-sep">·</span>
                      <span className="blog-read-time">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <div className="blog-author-small">
                        <div className="blog-author-avatar-sm">
                          {post.author.name[0]}
                        </div>
                        <span className="blog-author-name-sm">{post.author.name}</span>
                      </div>
                      <span className="blog-card-read">
                        Read <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {allFiltered.length === 0 && (
            <div className="blog-empty">
              <p>No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="blog-newsletter">
        <div className="blog-container">
          <motion.div
            className="blog-newsletter-inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Stay informed</span>
            <h2 className="blog-newsletter-title">Get the latest insights<br />in your inbox</h2>
            <p className="blog-newsletter-desc">
              No spam. Just the most useful content on electric material handling, warehousing, and logistics — once a month.
            </p>
            <form className="blog-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="blog-newsletter-input"
              />
              <button type="submit" className="btn btn-primary blog-newsletter-btn">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
