import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug, blogPosts } from '../data/blog';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="bp-not-found">
        <h2>Post not found</h2>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const fallbackRelated = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const relatedPosts = related.length > 0 ? related : fallbackRelated;

  return (
    <div className="bp">
      <div className="bp-glow bp-glow-1" />
      <div className="bp-glow bp-glow-2" />

      {/* Hero */}
      <section className="bp-hero">
        <div className="bp-container">
          <motion.div
            className="bp-breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/">HOME</Link>
            <ChevronRight size={12} />
            <Link to="/blog">BLOG</Link>
            <ChevronRight size={12} />
            <span>{post.category.toUpperCase()}</span>
          </motion.div>

          <motion.div
            className="bp-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="bp-category-tag">{post.category}</span>
            <h1 className="bp-hero-title">{post.title}</h1>
            <p className="bp-hero-excerpt">{post.excerpt}</p>

            <div className="bp-hero-meta">
              <div className="bp-author">
                <div className="bp-author-avatar">{post.author.name[0]}</div>
                <div className="bp-author-info">
                  <span className="bp-author-name">{post.author.name}</span>
                  <span className="bp-author-role">{post.author.role}</span>
                </div>
              </div>
              <div className="bp-meta-right">
                <span className="bp-date">{post.date}</span>
                <span className="bp-meta-sep">·</span>
                <span className="bp-read-time">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bp-hero-image"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img src={post.heroImage} alt={post.title} />
          <div className="bp-hero-image-overlay" />
        </motion.div>
      </section>

      {/* Content */}
      <section className="bp-body">
        <div className="bp-container">
          <div className="bp-body-grid">
            {/* Article */}
            <motion.article
              className="bp-article"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {post.content.map((block, i) => {
                if (block.type === 'paragraph') {
                  return (
                    <p key={i} className="bp-paragraph">{block.text}</p>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h2 key={i} className="bp-heading">{block.text}</h2>
                  );
                }
                if (block.type === 'stat') {
                  return (
                    <div key={i} className="bp-inline-stat">
                      <span className="bp-inline-stat-value">{block.value}</span>
                      <span className="bp-inline-stat-label">{block.label}</span>
                    </div>
                  );
                }
                return null;
              })}

              {/* Tags */}
              <div className="bp-tags">
                {post.tags.map((tag, i) => (
                  <span key={i} className="bp-tag">{tag}</span>
                ))}
              </div>

              <div className="bp-back-link">
                <Link to="/blog" className="bp-back-btn">
                  <ArrowLeft size={16} /> Back to all articles
                </Link>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="bp-sidebar">
              <motion.div
                className="bp-sidebar-card bp-author-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="bp-sidebar-author-avatar">{post.author.name[0]}</div>
                <div className="bp-sidebar-author-name">{post.author.name}</div>
                <div className="bp-sidebar-author-role">{post.author.role}</div>
              </motion.div>

              <motion.div
                className="bp-sidebar-card bp-cta-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="bp-cta-title">Need expert advice?</h3>
                <p className="bp-cta-text">
                  Talk to our team about your material handling challenges.
                </p>
                <Link to="/#contact" className="btn btn-primary bp-cta-btn">
                  Get in touch <ArrowRight size={15} />
                </Link>
              </motion.div>

              <motion.div
                className="bp-sidebar-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="bp-sidebar-section-title">Related posts</h3>
                <div className="bp-sidebar-posts">
                  {relatedPosts.map((p) => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className="bp-sidebar-post">
                      <div className="bp-sidebar-post-image">
                        <img src={p.thumbnail} alt={p.title} />
                      </div>
                      <div className="bp-sidebar-post-info">
                        <span className="bp-sidebar-post-category">{p.category}</span>
                        <h4 className="bp-sidebar-post-title">{p.title}</h4>
                        <span className="bp-sidebar-post-time">
                          <Clock size={11} />
                          {p.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
