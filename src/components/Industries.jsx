import { useState } from 'react';
import { Package, Factory, Pill, ShoppingCart, Plane } from 'lucide-react';
import './Industries.css';

const Industries = () => {
  const [activeTab, setActiveTab] = useState(0);

  const industries = [
    {
      icon: <Package size={18} />,
      name: 'Warehousing & Logistics',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
      description: 'MHE Next provides comprehensive material handling solutions for warehouses and distribution centers of all sizes.',
      features: [
        'Pallet trucks and stackers for efficient load movement.',
        'Automated storage and retrieval systems (AS/RS).',
        'Conveyor systems for seamless product flow.',
        'Dock equipment for safe loading and unloading.'
      ]
    },
    {
      icon: <Factory size={18} />,
      name: 'Manufacturing',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80',
      description: 'Streamline your production lines with our industrial material handling equipment.',
      features: [
        'Heavy-duty forklifts for raw material handling.',
        'Assembly line conveyors and transfer systems.',
        'Ergonomic lifting equipment for worker safety.',
        'Custom solutions for specialized manufacturing needs.'
      ]
    },
    {
      icon: <Pill size={18} />,
      name: 'Pharmaceutical',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
      description: 'Cleanroom-compatible and precision handling equipment for pharmaceutical facilities.',
      features: [
        'Stainless steel equipment for hygiene compliance.',
        'Temperature-controlled storage solutions.',
        'Precision handling for sensitive materials.',
        'FDA and GMP compliant equipment options.'
      ]
    },
    {
      icon: <ShoppingCart size={18} />,
      name: 'Retail & E-commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      description: 'Fast-paced fulfillment solutions for retail and e-commerce operations.',
      features: [
        'Order picking systems for high-volume fulfillment.',
        'Sorting and packing station equipment.',
        'Mobile shelving for space optimization.',
        'Last-mile delivery support equipment.'
      ]
    },
    {
      icon: <Plane size={18} />,
      name: 'Aviation & Aerospace',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
      description: 'Specialized handling equipment for aviation and aerospace industries.',
      features: [
        'Aircraft component handling systems.',
        'Heavy-lift equipment for engine maintenance.',
        'Precision positioning equipment.',
        'Ground support equipment solutions.'
      ]
    }
  ];

  const activeIndustry = industries[activeTab];

  return (
    <section className="industries section">
      <div className="container">
        <div className="industries-header">
          <span className="section-tag">Industries we serve</span>
          <h2 className="industries-title">
            Powering <span>efficient operations</span> across<br />
            diverse industries
          </h2>
        </div>

        <div className="industries-tabs">
          {industries.map((industry, index) => (
            <button
              key={index}
              className={`industry-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {industry.icon}
              <span>{industry.name}</span>
            </button>
          ))}
        </div>

        <div className="industries-content">
          <div className="industry-image">
            <img src={activeIndustry.image} alt={activeIndustry.name} />
          </div>
          <div className="industry-info">
            <h3 className="industry-title">{activeIndustry.name}</h3>
            <p className="industry-description">{activeIndustry.description}</p>
            <ul className="industry-features">
              {activeIndustry.features.map((feature, index) => (
                <li key={index}>
                  <span className="feature-bullet">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
