import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import './BlogPage.css';

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Industry News', 'Product Updates', 'Best Practices', 'Customer Stories', 'Sustainability'];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Electric Forklifts in Indian Manufacturing',
      excerpt: 'Explore how electric forklifts are transforming the manufacturing landscape in India with zero emissions, lower operational costs, and superior performance.',
      category: 'Industry News',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      author: {
        name: 'Rajesh Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      },
      date: 'Feb 10, 2026',
      readTime: '5 min read',
      featured: true
    },
    {
      id: 2,
      title: 'New 10-Ton Electric Forklift Launch: Power Meets Sustainability',
      excerpt: 'Introducing our latest heavy-duty electric forklift designed for steel plants and ports — delivering diesel-level performance with zero emissions.',
      category: 'Product Updates',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
      author: {
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop'
      },
      date: 'Feb 8, 2026',
      readTime: '4 min read',
      featured: false
    },
    {
      id: 3,
      title: 'Best Practices for Fleet Management in Large Warehouses',
      excerpt: 'Learn proven strategies to optimize forklift utilization, reduce downtime, and maximize ROI through intelligent fleet management systems.',
      category: 'Best Practices',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80',
      author: {
        name: 'Vikram Patel',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop'
      },
      date: 'Feb 5, 2026',
      readTime: '7 min read',
      featured: false
    },
    {
      id: 4,
      title: 'How Tata Steel Achieved 99.5% Uptime with MHE Next',
      excerpt: 'A deep dive into Tata Steel\'s material handling transformation — from diesel forklifts to a fully electric fleet with exceptional reliability.',
      category: 'Customer Stories',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80',
      author: {
        name: 'Anjali Desai',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop'
      },
      date: 'Feb 3, 2026',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 5,
      title: 'Carbon Neutrality in Warehousing: A Practical Guide',
      excerpt: 'Discover actionable steps to reduce your warehouse carbon footprint through electric material handling equipment and sustainable practices.',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
      author: {
        name: 'Dr. Meera Iyer',
        avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop'
      },
      date: 'Jan 30, 2026',
      readTime: '8 min read',
      featured: false
    },
    {
      id: 6,
      title: 'IoT and Telematics: The Smart Warehouse Revolution',
      excerpt: 'How IoT-enabled forklifts are providing real-time insights, predictive maintenance, and operational efficiency gains of up to 40%.',
      category: 'Industry News',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
      author: {
        name: 'Arjun Singh',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
      },
      date: 'Jan 28, 2026',
      readTime: '5 min read',
      featured: false
    },
    {
      id: 7,
      title: 'Lithium-ion vs Lead-acid: Which Battery is Right for You?',
      excerpt: 'A comprehensive comparison of battery technologies for electric forklifts — covering TCO, performance, lifespan, and use cases.',
      category: 'Best Practices',
      image: 'https://images.unsplash.com/photo-1609146835271-fbc2b2e0fdb4?w=600&q=80',
      author: {
        name: 'Suresh Kumar',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      },
      date: 'Jan 25, 2026',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 8,
      title: 'Safety First: Forklift Operator Training Best Practices',
      excerpt: 'Essential training protocols and safety standards to prevent accidents and ensure compliant, efficient forklift operations.',
      category: 'Best Practices',
      image: 'https://images.unsplash.com/photo-1581092918484-8313a1f2985e?w=600&q=80',
      author: {
        name: 'Neha Kapoor',
        avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop'
      },
      date: 'Jan 22, 2026',
      readTime: '5 min read',
      featured: false
    },
    {
      id: 9,
      title: 'Three-Wheel vs Four-Wheel: Choosing the Right Forklift',
      excerpt: 'Understand the pros and cons of three-wheel compact forklifts versus traditional four-wheel models for your specific application.',
      category: 'Product Updates',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
      author: {
        name: 'Karan Mehta',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop'
      },
      date: 'Jan 20, 2026',
      readTime: '4 min read',
      featured: false
    }
  ];

  const filteredPosts = activeFilter === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <motion.div
            className="blog-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-tag">Insights & Updates</span>
            <h1 className="blog-hero-title">
              MHE Next <span className="text-orange">Blog</span>
            </h1>
            <p className="blog-hero-subtitle">
              Industry insights, product updates, and expert advice on material handling equipment and warehouse optimization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="blog-filter-section">
        <div className="container">
          <motion.div
            className="blog-filter-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                className={`blog-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-content-section">
        <div className="container">
          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              className="featured-post"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="featured-post-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
                <div className="featured-badge">Featured</div>
              </div>
              <div className="featured-post-content">
                <div className="post-category">{featuredPost.category}</div>
                <h2 className="featured-post-title">{featuredPost.title}</h2>
                <p className="featured-post-excerpt">{featuredPost.excerpt}</p>
                <div className="post-meta">
                  <div className="post-author">
                    <img src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <div className="post-info">
                    <span className="post-date">
                      <Calendar size={14} />
                      {featuredPost.date}
                    </span>
                    <span className="post-read-time">
                      <Clock size={14} />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
                <button className="btn btn-primary featured-post-btn">
                  Read article
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          <div className="blog-posts-grid">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="blog-post-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  <div className="post-category-badge">{post.category}</div>
                </div>
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-footer">
                    <div className="post-author">
                      <img src={post.author.avatar} alt={post.author.name} />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="post-info">
                      <span className="post-date">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="post-read-time">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <a href="#" className="post-read-more">
                    Read more
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            className="blog-load-more"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button className="btn btn-outline">
              Load more articles
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-newsletter-cta">
        <div className="container">
          <motion.div
            className="newsletter-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="newsletter-title">Stay updated with our latest insights</h2>
            <p className="newsletter-text">
              Subscribe to our newsletter and get the latest industry news, product updates, and expert tips delivered to your inbox.
            </p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
