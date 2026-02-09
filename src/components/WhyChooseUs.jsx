import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Industry-leading equipment',
      description: 'We partner with top global manufacturers to bring you the most reliable and efficient material handling equipment on the market.'
    },
    {
      title: 'Expert support & service',
      description: 'Our team of certified technicians provides round-the-clock maintenance, repairs, and technical support to keep your operations running smoothly.'
    },
    {
      title: 'Customized solutions',
      description: 'We design and implement tailored material handling systems that perfectly match your warehouse layout, workflow, and business objectives.'
    }
  ];

  return (
    <section className="why-choose-us section">
      <div className="container">
        <div className="why-choose-us-grid">
          <div className="why-choose-us-content">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="why-choose-us-title">
              Why <span>MHE Next</span> is<br />
              the <span className="text-orange">smarter choice</span>
            </h2>

            <div className="reasons-list">
              {reasons.map((reason, index) => (
                <div key={index} className="reason-item">
                  <span className="reason-indicator">+</span>
                  <div className="reason-content">
                    <h3 className="reason-title">{reason.title}</h3>
                    <p className="reason-description">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary why-cta">
              Meet our team
            </button>
          </div>

          <div className="why-choose-us-image">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"
              alt="Warehouse with material handling equipment"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
