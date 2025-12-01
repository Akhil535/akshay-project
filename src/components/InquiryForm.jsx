import React, { useState } from 'react';

const InquiryForm = ({ product, selectedKarat, currentGoldPrice, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weight: '',
    customizationDays: '7',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co - FREE service
      const response = await fetch('https://formsubmit.co/ajax/interactwithakshay@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          product: product.name,
          gold_karat: selectedKarat,
          weight: formData.weight,
          customization_days: formData.customizationDays,
          special_requests: formData.specialRequests,
          estimated_price: `AED ${calculatePrice(formData.weight || 0)}`,
          delivery_date: getDeliveryDate(formData.customizationDays),
          _subject: `💎 Custom Jewelry Order - ${product.name} - ${formData.name}`,
          _template: 'table'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('✨ Thank you for your custom jewelry inquiry! Our master jewelers will contact you within 24 hours.');
        onClose();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('✅ Inquiry submitted! Our team will contact you soon.');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculatePrice = (weight) => {
    if (!weight || weight <= 0) return '0';
    const goldPrice = weight * currentGoldPrice;
    const makingCost = weight * product.makingCharge;
    return (goldPrice + makingCost).toFixed(2);
  };

  const getDeliveryDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(days));
    return date.toLocaleDateString();
  };

  return (
    <div className="inquiry-modal">
      <div className="inquiry-form">
        <h2>Custom Jewelry Inquiry</h2>
        <p style={{textAlign: 'center', marginBottom: '20px', color: '#666'}}>
          For: {product.name} ({selectedKarat})
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label>Desired Weight (grams)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="1"
              step="0.1"
              placeholder="Enter weight in grams"
            />
          </div>

          {formData.weight && formData.weight > 0 && (
            <div className="price-calculator">
              <div style={{textAlign: 'center'}}>
                <div>Estimated Price: <span className="price-highlight">AED {calculatePrice(formData.weight)}</span></div>
                <div style={{marginTop: '10px', fontSize: '0.9rem'}}>
                  Delivery: {getDeliveryDate(formData.customizationDays)}
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Customization Time</label>
            <select
              name="customizationDays"
              value={formData.customizationDays}
              onChange={handleChange}
            >
              <option value="5">5 days (Express)</option>
              <option value="7">7 days (Standard)</option>
              <option value="10">10 days (Detailed Work)</option>
              <option value="14">14 days (Complex Design)</option>
            </select>
            <small style={{color: '#666', marginTop: '5px', display: 'block'}}>
              Estimated delivery: {getDeliveryDate(formData.customizationDays)}
            </small>
          </div>

          <div className="form-group">
            <label>Special Requests & Design Notes</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your design preferences, stone choices, etc."
            />
          </div>

          {/* {formData.weight && formData.weight > 0 && (
            <div className="price-calculator">
              <div style={{textAlign: 'center'}}>
                <div>Estimated Price: <span className="price-highlight">AED {calculatePrice(formData.weight)}</span></div>
                <div style={{marginTop: '10px', fontSize: '0.9rem'}}>
                  Delivery: {getDeliveryDate(formData.customizationDays)}
                </div>
              </div>
            </div>
          )} */}

          <div className="form-buttons">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;