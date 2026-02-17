import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CaseStudies.css';

const CaseStudies = () => {
  const caseStudies = [
    {
      slug: 'ecommerce-fulfillment-automation',
      title: 'E-commerce fulfillment center automation',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80',
      stats: [
        { value: '60%', label: 'Increase in order processing' },
        { value: '35%', label: 'Reduction in labor costs' }
      ]
    },
    {
      slug: 'pharmaceutical-warehouse-modernization',
      title: 'Pharmaceutical warehouse modernization',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
      stats: [
        { value: '99.9%', label: 'Inventory accuracy achieved' },
        { value: '50%', label: 'Faster order fulfillment' }
      ]
    }
  ];

  return (
    <section className="case-studies section">
      <div className="container">
        <div className="case-studies-header">
          <div className="case-studies-header-left">
            <span className="section-tag">Case Studies</span>
            <h2 className="case-studies-title">
              Success stories <span>from our</span><br />
              <span>satisfied clients</span>
            </h2>
          </div>
          <Link to="/case-studies" className="btn btn-outline case-studies-btn">
            See all case studies
          </Link>
        </div>

        <div className="case-studies-grid">
          {caseStudies.map((study, index) => (
            <div key={index} className="case-study-card">
              <div className="case-study-content">
                <h3 className="case-study-title">{study.title}</h3>
                <div className="case-study-stats">
                  {study.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="case-study-stat">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <Link to={`/case-studies/${study.slug}`} className="btn btn-dark case-study-cta">
                  View case
                </Link>
              </div>
              <div className="case-study-image">
                <img src={study.image} alt={study.title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="case-studies-bg-image">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
          alt="Warehouse background"
        />
      </div>
    </section>
  );
};

export default CaseStudies;
