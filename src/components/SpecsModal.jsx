import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ClipboardList, Download } from 'lucide-react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import './SpecsModal.css';

const variants = [
  {
    key: 'standard',
    name: '1.5 Ton',
    tag: 'Standard',
    specs: [
      { label: 'Load Capacity', value: '1,500 kg' },
      { label: 'Lift Height (Max)', value: '4,500 mm' },
      { label: 'Fork Length', value: '1,070 mm' },
      { label: 'Travel Speed (Loaded)', value: '14 km/h' },
      { label: 'Lift Speed (Loaded)', value: '0.50 m/s' },
      { label: 'Battery', value: '48V · 400 Ah' },
      { label: 'Turning Radius', value: '1,950 mm' },
      { label: 'Overall Length', value: '3,280 mm' },
      { label: 'Charging Time', value: '6 hours' },
      { label: 'Operating Noise', value: '< 68 dB' },
      { label: 'Service Weight', value: '3,200 kg' },
    ],
  },
  {
    key: 'medium',
    name: '2.0 Ton',
    tag: 'Popular',
    specs: [
      { label: 'Load Capacity', value: '2,000 kg' },
      { label: 'Lift Height (Max)', value: '5,500 mm' },
      { label: 'Fork Length', value: '1,070 mm' },
      { label: 'Travel Speed (Loaded)', value: '14 km/h' },
      { label: 'Lift Speed (Loaded)', value: '0.45 m/s' },
      { label: 'Battery', value: '80V · 560 Ah' },
      { label: 'Turning Radius', value: '2,050 mm' },
      { label: 'Overall Length', value: '3,380 mm' },
      { label: 'Charging Time', value: '7 hours' },
      { label: 'Operating Noise', value: '< 70 dB' },
      { label: 'Service Weight', value: '3,800 kg' },
    ],
  },
  {
    key: 'heavy',
    name: '2.5 Ton',
    tag: 'Heavy Duty',
    specs: [
      { label: 'Load Capacity', value: '2,500 kg' },
      { label: 'Lift Height (Max)', value: '6,000 mm' },
      { label: 'Fork Length', value: '1,070 mm' },
      { label: 'Travel Speed (Loaded)', value: '13 km/h' },
      { label: 'Lift Speed (Loaded)', value: '0.40 m/s' },
      { label: 'Battery', value: '80V · 700 Ah' },
      { label: 'Turning Radius', value: '2,100 mm' },
      { label: 'Overall Length', value: '3,450 mm' },
      { label: 'Charging Time', value: '8 hours' },
      { label: 'Operating Noise', value: '< 72 dB' },
      { label: 'Service Weight', value: '4,350 kg' },
    ],
  },
];

export default function SpecsModal({ isOpen, onClose }) {
  const ref = useRef(null);
  const [selected, setSelected] = useState('medium');

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useOutsideClick(ref, () => {
    if (isOpen) onClose();
  });

  const activeVariant = variants.find((v) => v.key === selected);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="specs-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="specs-modal-wrapper">
            <motion.div
              ref={ref}
              className="specs-modal"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <button className="specs-modal-close" onClick={onClose}>
                <X size={18} />
              </button>

              <div className="specs-modal-scroll">
                {/* Header */}
                <div className="specs-modal-header">
                  <div className="specs-modal-icon">
                    <ClipboardList size={22} />
                  </div>
                  <h3 className="specs-modal-title">Technical Specifications</h3>
                  <p className="specs-modal-subtitle">
                    Select a variant to view detailed specifications
                  </p>
                </div>

                {/* Variant Selector */}
                <div className="specs-variant-selector">
                  {variants.map((v) => (
                    <button
                      key={v.key}
                      className={`specs-variant-btn ${selected === v.key ? 'active' : ''}`}
                      onClick={() => setSelected(v.key)}
                    >
                      <span className="specs-variant-name">{v.name}</span>
                      <span className="specs-variant-tag">{v.tag}</span>
                    </button>
                  ))}
                </div>

                {/* Specs Table */}
                <div className="specs-modal-table">
                  {activeVariant.specs.map((s, i) => (
                    <div key={i} className="specs-modal-row">
                      <span className="specs-modal-label">{s.label}</span>
                      <span className="specs-modal-value">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Download Button */}
                <div className="specs-modal-download">
                  <button className="specs-download-btn">
                    <Download size={16} />
                    Download {activeVariant.name} Spec Sheet (PDF)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
