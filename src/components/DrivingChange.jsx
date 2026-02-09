import './DrivingChange.css';

const DrivingChange = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
      alt: 'Warehouse operations',
      rotation: -8
    },
    {
      src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80',
      alt: 'Forklift in warehouse',
      rotation: 3
    },
    {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
      alt: 'Industrial automation',
      rotation: -5
    },
    {
      src: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80',
      alt: 'Manufacturing facility',
      rotation: 6
    }
  ];

  return (
    <section className="driving-change section">
      <div className="container">
        <div className="driving-change-header">
          <span className="section-tag">Who We Are</span>
          <h2 className="driving-change-title">
            At MHE Next, we are<br />
            <span className="text-orange">transforming</span> warehouses with<br />
            <span className="text-orange">innovative</span> handling solutions.
          </h2>
        </div>

        <div className="driving-change-images">
          {images.map((image, index) => (
            <div
              key={index}
              className="driving-change-image-wrapper"
              style={{ '--rotation': `${image.rotation}deg` }}
            >
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>

        <div className="driving-change-cta">
          <button className="btn btn-primary">More about us</button>
        </div>
      </div>
    </section>
  );
};

export default DrivingChange;
