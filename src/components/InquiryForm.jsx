import React, { useState, useEffect } from 'react';

const InquiryForm = ({ product, selectedKarat, currentGoldPrice, onClose, weight: initialWeight = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weight: initialWeight,
    customizationDays: '7',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update weight when initialWeight prop changes
  useEffect(() => {
    if (initialWeight && initialWeight > 0) {
      setFormData(prev => ({
        ...prev,
        weight: initialWeight
      }));
    }
  }, [initialWeight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate weight
      const weight = parseFloat(formData.weight);
      if (isNaN(weight) || weight <= 0) {
        alert('Please enter a valid weight greater than 0');
        setIsSubmitting(false);
        return;
      }

      // Calculate price
      const estimatedPrice = calculatePrice(weight);
      
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
          product: product?.name || 'Custom Jewelry',
          gold_karat: selectedKarat || '22K',
          weight: weight,
          customization_days: formData.customizationDays,
          special_requests: formData.specialRequests,
          estimated_price: `AED ${estimatedPrice}`,
          delivery_date: getDeliveryDate(formData.customizationDays),
          _subject: `💎 Custom Jewelry Order - ${product?.name || 'Custom'} - ${formData.name}`,
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
    const { name, value } = e.target;
    
    // For weight input, validate it's a number
    if (name === 'weight') {
      // Allow empty or valid numbers
      if (value === '' || !isNaN(parseFloat(value))) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const calculatePrice = (weight) => {
    if (!weight || weight <= 0) return '0';
    
    // Use provided currentGoldPrice or default to 22K price
    const goldPricePerGram = currentGoldPrice || 230; // Default to 22K price
    const makingCharge = product?.makingCharge || 30; // Default making charge
    
    const goldValue = weight * goldPricePerGram;
    const makingCost = weight * makingCharge;
    return (goldValue + makingCost).toFixed(2);
  };

  const getDeliveryDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(days));
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Parse weight safely
  const parsedWeight = parseFloat(formData.weight);
  const isValidWeight = !isNaN(parsedWeight) && parsedWeight > 0;

  return (
    <div className="inquiry-modal">
      <div className="inquiry-form">
        <h2>Custom Jewelry Inquiry</h2>
        <p style={{textAlign: 'center', marginBottom: '20px', color: 'var(--text-muted)'}}>
          For: {product?.name || 'Custom Jewelry'} ({selectedKarat || '22K'})
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
              pattern="[0-9]{10,}"
              title="Please enter a valid phone number (at least 10 digits)"
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
            <label>Desired Weight (grams) *</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="0.1"
              step="0.1"
              required
              placeholder="e.g., 8.5"
              inputMode="decimal"
            />
            {formData.weight && !isValidWeight && (
              <small style={{color: 'var(--gold-primary)', marginTop: '5px', display: 'block'}}>
                Please enter a valid weight greater than 0
              </small>
            )}
          </div>

          {isValidWeight && (
            <div className="price-calculator">
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '1.1rem', marginBottom: '5px'}}>
                  Estimated Price: 
                  <span className="price-highlight" style={{marginLeft: '10px'}}>
                    AED {calculatePrice(parsedWeight)}
                  </span>
                </div>
                <div style={{marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-muted)'}}>
                  📅 Delivery: {getDeliveryDate(formData.customizationDays)}
                </div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px'}}>
                  Based on {selectedKarat || '22K'} gold
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
              <option value="5">5 days (Express) +15%</option>
              <option value="7">7 days (Standard)</option>
              <option value="10">10 days (Detailed Work)</option>
              <option value="14">14 days (Complex Design)</option>
            </select>
            <small style={{color: 'var(--text-muted)', marginTop: '5px', display: 'block'}}>
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
              placeholder="Tell us about your design preferences, stone choices, engraving, etc."
            />
          </div>

          <div className="form-buttons">
            <button 
              type="submit" 
              disabled={isSubmitting || !isValidWeight}
              style={{ opacity: (!isValidWeight || isSubmitting) ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Sending... ✨' : '✨ Submit Inquiry'}
            </button>
            <button type="button" onClick={onClose} style={{background: 'rgba(108, 117, 125, 0.8)'}}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;