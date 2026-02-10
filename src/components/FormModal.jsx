import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Send, CheckCircle } from 'lucide-react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import './FormModal.css';

export default function FormModal({ isOpen, onClose, title, subtitle }) {
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      onClose();
    }, 2500);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="form-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="form-modal-wrapper">
            <motion.div
              ref={ref}
              className="form-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <button className="form-modal-close" onClick={handleClose}>
                <X size={18} />
              </button>

              <div className="form-modal-scroll">
                <div className="form-modal-header">
                  <h3 className="form-modal-title">{title || 'Get in Touch'}</h3>
                  {subtitle && <p className="form-modal-subtitle">{subtitle}</p>}
                </div>

                {submitted ? (
                  <motion.div
                    className="form-modal-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle size={48} />
                    <h4>Thank You!</h4>
                    <p>We've received your request. Our team will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form className="form-modal-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="form-name">Full Name</label>
                        <input
                          id="form-name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-email">Email</label>
                        <input
                          id="form-email"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="form-phone">Phone Number</label>
                        <input
                          id="form-phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-company">Company</label>
                        <input
                          id="form-company"
                          name="company"
                          type="text"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="form-message">Message</label>
                      <textarea
                        id="form-message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your requirements..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="form-modal-submit">
                      <Send size={16} />
                      Submit Request
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
