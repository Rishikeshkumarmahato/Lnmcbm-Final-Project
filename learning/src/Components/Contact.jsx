import React, { useState } from 'react'
import './Contact.css';
import img1 from '../assets/Contact/img1.webp'
import Header from './Header';
import Footer from './Footer';
import Robot from './Robot';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus('sending');
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 3000);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <Header/>
      <div className='contact'>
        <div className='contact_item1'>
          <div className="contact-header">
            <h6>How can we help you?</h6>
            <h1>Contact Us</h1>
            <p>We're here to help and answer any questions you might have. We look forward to hearing from you!</p>
          </div>
          <div className='contact-methods'>
            <div className='contact_method'>
              <div className="method-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h5>Søren Frichs Vej 42B, 8230 Åbyhøj</h5>
            </div>
            <div className='contact_method'>
              <div className="method-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <h5>+45 71 99 77 07</h5>
            </div>
            <div className='contact_method'>
              <div className="method-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <h5>mahatorishikeshkumar@gmail.com</h5>
            </div>
          </div>
        </div>
        <div className="contact_item2">
          <img src={img1} alt="Contact illustration" />
        </div>
      </div>
      <div className='query'>
        <h1>Send your query<span className="dots">...</span></h1>
        <form onSubmit={handleSubmit} className="query-form">
          <div className='query_box'>
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='Your Name'
                className={formErrors.name ? 'error' : ''}
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Email Address'
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
          </div>
          <div className='query_box'>
            <div className="input-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder='Mobile Number'
                className={formErrors.phone ? 'error' : ''}
              />
              {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
            </div>
            <div className="input-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder='Subject'
                className={formErrors.subject ? 'error' : ''}
              />
              {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
            </div>
          </div>
          <div className='question'>
            <div className="input-group full-width">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={7}
                placeholder='Tell me about your query...'
                className={formErrors.message ? 'error' : ''}
              ></textarea>
              {formErrors.message && <span className="error-message">{formErrors.message}</span>}
            </div>
          </div>
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''} ${submitStatus ? submitStatus : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="button-content">
                <i className="fa-solid fa-spinner fa-spin"></i>
                Sending...
              </span>
            ) : submitStatus === 'success' ? (
              <span className="button-content">
                <i className="fa-solid fa-check"></i>
                Sent!
              </span>
            ) : submitStatus === 'error' ? (
              <span className="button-content">
                <i className="fa-solid fa-exclamation-triangle"></i>
                Error
              </span>
            ) : (
              <span className="button-content">
                <i className="fa-solid fa-paper-plane"></i>
                Submit
              </span>
            )}
          </button>
        </form>
      </div>
      <Footer/>
    </>
  )
}

export default Contact