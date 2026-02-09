import { useState } from 'react';
import { ChevronLeft, ChevronRight, Building2, Briefcase, Factory, Package, Warehouse, Users } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Warehouse Manager',
      company: 'LogiPro India',
      icon: <Warehouse size={16} />,
      quote: 'MHE Next transformed our warehouse efficiency. Their forklifts and stackers have reduced our loading time by 40%.'
    },
    {
      name: 'Priya Sharma',
      role: 'Operations Head',
      company: 'FastTrack Logistics',
      icon: <Briefcase size={16} />,
      quote: 'The maintenance support from MHE Next is exceptional. Zero downtime in the last 6 months thanks to their proactive service.'
    },
    {
      name: 'Amit Patel',
      role: 'Plant Director',
      company: 'Sterling Manufacturing',
      icon: <Factory size={16} />,
      quote: 'We equipped our entire facility with MHE Next solutions. The custom conveyor system they designed boosted our throughput by 60%.'
    },
    {
      name: 'Sneha Reddy',
      role: 'Supply Chain Director',
      company: 'MegaMart Retail',
      icon: <Package size={16} />,
      quote: 'From order picking to dispatch, MHE Next equipment has streamlined our entire fulfillment process. Highly recommended!'
    },
    {
      name: 'Vikram Singh',
      role: 'Facility Manager',
      company: 'Apex Pharmaceuticals',
      icon: <Building2 size={16} />,
      quote: 'Their stainless steel equipment meets all our cleanroom requirements. MHE Next understands pharma industry compliance.'
    },
    {
      name: 'Ananya Gupta',
      role: 'COO',
      company: 'QuickShip Express',
      icon: <Users size={16} />,
      quote: 'Partnering with MHE Next was the best decision for our distribution centers. ROI achieved within the first year.'
    }
  ];

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <div className="testimonials-bg">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
          alt="Warehouse interior"
        />
        <div className="testimonials-overlay" />
      </div>

      <div className="testimonials-content">
        <div className="testimonials-header">
          <h2 className="testimonials-title">
            What our <span className="text-orange">clients say</span>
          </h2>
          <p className="testimonials-subtitle">
            Trusted by leading businesses<br />
            for material handling excellence
          </p>
        </div>

        <div className="testimonials-carousel">
          <button className="carousel-btn prev" onClick={prevTestimonial}>
            <ChevronLeft size={20} />
          </button>

          <div className="testimonials-track">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card position-${testimonial.position}`}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {testimonial.icon}
                  </div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
                <p className="testimonial-quote">{testimonial.quote}</p>
              </div>
            ))}
          </div>

          <button className="carousel-btn next" onClick={nextTestimonial}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
