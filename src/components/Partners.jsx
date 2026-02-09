import './Partners.css';

const Partners = () => {
  const partners = [
    { name: 'Toyota', icon: '◆' },
    { name: 'Jungheinrich', icon: '▲' },
    { name: 'Crown', icon: '●' },
    { name: 'Hyster', icon: '■' },
    { name: 'Linde', icon: '◇' },
    { name: 'Yale', icon: '▼' }
  ];

  return (
    <section className="partners">
      <div className="container">
        <p className="partners-label">Trusted partners & brands we work with</p>
        <div className="partners-track">
          {partners.map((partner, index) => (
            <div key={index} className="partner-item">
              <span className="partner-icon">{partner.icon}</span>
              <span className="partner-name">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
