import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InquiryForm from '../components/InquiryForm';
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import w from "../assets/w.png";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topRef = useRef(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [product, setProduct] = useState(null);
  const [weight, setWeight] = useState('');
  const [selectedKarat, setSelectedKarat] = useState('22K');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // UAE Gold Prices (Fixed)
  const goldPrices = {
    '24K': 250,
    '22K': 230, 
    '18K': 190
  };

  const productsData = [
    {
      id: 1,
      name: "The Solstice Band",
      category: "Engagement Ring",
      description: "Create your perfect engagement ring with premium diamonds. Choose from various diamond cuts and gold types to match your unique love story. Our expert craftsmen will bring your vision to life with meticulous attention to detail.",
      makingCharge: 35,
      estimatedDays: 10,
      features: ["Premium GIA Certified Diamonds", "18K/22K Gold Options", "Custom Design Consultation", "Lifetime Warranty", "Free Resizing"],
      image: img1,
      availableKarats: ['18K', '22K'],
      popularWeight: 8.5
    },
    {
      id: 2,
      name: "Celestial Diamond",
      category: "Diamond Ring", 
      description: "Stunning diamond ring set in premium gold. Perfect for special occasions that mark lifetime memories. Each diamond is hand-selected for its brilliance and clarity.",
      makingCharge: 45,
      estimatedDays: 12,
      features: ["Natural Diamonds", "22K Gold", "Four-Prong Setting", "Comfort Fit", "Gift Packaging"],
      image: img2,
      availableKarats: ['18K', '22K'],
      popularWeight: 9.0
    },
    {
      id: 3,
      name: "Horizon Promise",
      category: "Wedding Band",
      description: "Elegant wedding band with intricate design patterns. Symbolize your eternal love with this masterpiece. Custom engraving available for a personal touch.",
      makingCharge: 30,
      estimatedDays: 8,
      features: ["22K Gold", "Comfort Fit", "Free Engraving", "Lifetime Polish", "Secure Setting"],
      image: w,
      availableKarats: ['18K', '22K', '24K'],
      popularWeight: 7.5
    }
  ];

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default weight to popular weight
      setWeight(foundProduct.popularWeight.toString());
    } else {
      navigate('/collection');
    }
  }, [id, navigate]);

  useEffect(() => {
    // Reset image loading state when product changes
    setImageLoaded(false);
    setImageError(false);
  }, [product]);

  const calculatePrice = (grams) => {
    if (!grams || grams <= 0 || !product) return '0';
    
    const goldPricePerGram = goldPrices[selectedKarat];
    const makingCost = grams * product.makingCharge;
    const goldValue = grams * goldPricePerGram;
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

  const handleQuickWeight = (grams) => {
    setWeight(grams.toString());
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Stop loading animation
  };

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '150px', minHeight: '60vh' }}>
        <div style={{textAlign: 'center', padding: '100px 0'}}>
          <h2 style={{ color: 'var(--gold-primary)', marginBottom: '20px' }}>Loading product...</h2>
          <div className="loading-spinner"></div>
          <Link to="/" className="btn-gold" style={{display: 'inline-block', marginTop: '20px'}}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const estimatedPrice = weight && weight > 0 ? calculatePrice(parseFloat(weight)) : '0';

  return (
    <div ref={topRef} className="product-detail-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/collection">Collection</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Product Image Section */}
          <motion.div 
            className="product-detail-image"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="image-wrapper">
              {!imageLoaded && !imageError && (
                <div className="image-loading"></div>
              )}
              
              {imageError ? (
                <div className="image-fallback">
                  <div className="fallback-icon">
                    {product.category === 'Engagement Ring' ? '💍' : 
                     product.category === 'Diamond Ring' ? '💎' : 
                     product.category === 'Wedding Band' ? '👰' : '✨'}
                  </div>
                  <p className="fallback-text">Image not available</p>
                </div>
              ) : (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={`product-image ${imageLoaded ? 'loaded' : 'loading'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                  loading="lazy"
                />
              )}
            </div>
            
            {/* Quick Weight Suggestions */}
            <div className="quick-weights">
              <span className="quick-weights-label">Quick select weight:</span>
              <div className="quick-weights-buttons">
                {[product.popularWeight, 5, 10, 15].map((grams) => (
                  <button
                    key={grams}
                    type="button"
                    onClick={() => handleQuickWeight(grams)}
                    className={`quick-weight-btn ${weight === grams.toString() ? 'active' : ''}`}
                  >
                    {grams}g
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Product Info Section */}
          <motion.div
            className="product-detail-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-meta">
              <p className="product-category">{product.category}</p>
              
              <div className="delivery-badge">
                ⏱️ {product.estimatedDays} days delivery
              </div>
            </div>
            
            <p className="product-description">{product.description}</p>
            
            {/* Features Section */}
            <div className="features-section">
              <h3 className="features-title">✨ Features & Benefits:</h3>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-check">✓</span> 
                    <span className="feature-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gold Karat Selection */}
            <div className="karat-section">
              <label className="karat-label">
                Select Gold Purity:
              </label>
              <div className="karat-options">
                {product.availableKarats.map(karat => (
                  <motion.button
                    key={karat}
                    type="button"
                    onClick={() => setSelectedKarat(karat)}
                    className={`karat-option ${selectedKarat === karat ? 'active' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {karat} Gold
                  </motion.button>
                ))}
              </div>
              <div className="gold-rate-info">
                Current {selectedKarat} gold rate: <span className="gold-rate">
                  AED {goldPrices[selectedKarat]}/gram
                </span>
              </div>
            </div>

            {/* Pricing Calculator */}
            <div className="pricing-calculator">
              <h3 className="calculator-title">
                💎 Custom Pricing Calculator
              </h3>
              
              <div className="weight-input-section">
                <label className="weight-label">
                  Enter desired weight (grams):
                </label>
                <div className="weight-input-wrapper">
                  <input 
                    type="number" 
                    value={weight}
                    placeholder={`e.g., ${product.popularWeight}`}
                    min="0.1"
                    step="0.1"
                    onChange={(e) => setWeight(e.target.value)}
                    className="weight-input"
                  />
                  <span className="weight-unit">grams</span>
                </div>
              </div>

              {weight && parseFloat(weight) > 0 && (
                <motion.div 
                  className="price-result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="price-display">
                    <div className="estimated-price">
                      Estimated Price: 
                      <span className="price-highlight">
                        AED {estimatedPrice}
                      </span>
                    </div>
                    
                    <div className="price-breakdown">
                      <div className="breakdown-item">
                        <div className="breakdown-label">Gold Value</div>
                        <div className="breakdown-value">
                          AED {(parseFloat(weight) * goldPrices[selectedKarat]).toFixed(2)}
                        </div>
                      </div>
                      <div className="breakdown-item">
                        <div className="breakdown-label">Making Charges</div>
                        <div className="breakdown-value">
                          AED {(parseFloat(weight) * product.makingCharge).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="delivery-info">
                      📅 Delivery by: <span className="delivery-date">
                        {getDeliveryDate(product.estimatedDays)}
                      </span>
                    </div>
                    <div className="price-note">
                      * Based on {selectedKarat} gold at AED {goldPrices[selectedKarat]}/gram
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.button 
                className="btn-gold inquiry-btn"
                onClick={() => setShowInquiry(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ✨ Request Custom Creation
              </motion.button>

              <p className="calculator-note">
                * Includes free design consultation, lifetime warranty, and insurance
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {showInquiry && (
        <InquiryForm 
          product={product}
          selectedKarat={selectedKarat}
          weight={weight}
          estimatedPrice={estimatedPrice}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  );
};

export default ProductPage;