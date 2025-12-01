import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import InquiryForm from '../components/InquiryForm';
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import w from "../assets/w.png";
const ProductPage = () => {
  const { id } = useParams();
  const [showInquiry, setShowInquiry] = useState(false);
  const [product, setProduct] = useState(null);
  const [weight, setWeight] = useState('');
  const [selectedKarat, setSelectedKarat] = useState('22K');

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
      description: "Create your perfect engagement ring with premium diamonds. Choose from various diamond cuts and gold types to match your unique love story.",
      makingCharge: 35,
      estimatedDays: 10,
      features: ["Premium GIA Certified Diamonds", "18K/22K Gold Options", "Custom Design Consultation", "Lifetime Warranty", "Free Resizing"],
      image: img1,
      availableKarats: ['18K', '22K']
    },
    {
      id: 2,
      name: "Celestial Diamond",
      category: "Diamond Ring", 
      description: "Stunning diamond ring set in premium gold. Perfect for special occasions that mark lifetime memories.",
      makingCharge: 45,
      estimatedDays: 12,
      features: ["Natural Diamonds", "22K Gold", "Four-Prong Setting", "Comfort Fit", "Gift Packaging"],
      image: img2,
      availableKarats: ['18K', '22K']
    },
    {
      id: 3,
      name: "Horizon Promise",
      category: "Wedding Band",
      description: "Elegant wedding band with intricate design patterns. Symbolize your eternal love with this masterpiece.",
      makingCharge: 30,
      estimatedDays: 8,
      features: ["22K Gold", "Comfort Fit", "Free Engraving", "Lifetime Polish", "Secure Setting"],
      image: w,
      availableKarats: ['18K', '22K', '24K']
    }
  ];

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const calculatePrice = (grams) => {
    if (!grams || grams <= 0) return '0';
    if (!product) return '0';
    
    const goldPricePerGram = goldPrices[selectedKarat];
    const makingCost = grams * product.makingCharge;
    const goldValue = grams * goldPricePerGram;
    return (goldValue + makingCost).toFixed(2);
  };

  const getDeliveryDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(days));
    return date.toLocaleDateString();
  };

  if (!product) {
    return (
      <div className="container">
        <div style={{textAlign: 'center', padding: '100px 0'}}>
          <h2>Product not found</h2>
          <Link to="/" className="btn-gold" style={{display: 'inline-block', marginTop: '20px'}}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{paddingTop: '120px'}}>
      <div className="container">
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start'}}>
          {/* Product Image */}
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              style={{width: '100%', borderRadius: '12px', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.8))'}}
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 style={{fontSize: '2.5rem', marginBottom: '10px', color: 'var(--gold-light)'}}>{product.name}</h1>
            <p style={{color: 'var(--gold-primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px'}}>{product.category}</p>
            <p style={{color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px'}}>{product.description}</p>
            
            <div style={{marginBottom: '30px'}}>
              <h3 style={{color: 'var(--gold-primary)', marginBottom: '15px'}}>Features:</h3>
              <ul style={{color: 'var(--text-muted)', listStyle: 'none'}}>
                {product.features.map((feature, index) => (
                  <li key={index} style={{padding: '5px 0', position: 'relative', paddingLeft: '20px'}}>
                    <span style={{color: 'var(--gold-primary)', position: 'absolute', left: '0'}}>✦</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gold Karat Selection */}
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', marginBottom: '10px', fontWeight: '600', color: 'var(--gold-light)'}}>
                Select Gold Purity:
              </label>
              <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                {product.availableKarats.map(karat => (
                  <button
                    key={karat}
                    type="button"
                    onClick={() => setSelectedKarat(karat)}
                    style={{
                      padding: '10px 20px',
                      border: selectedKarat === karat ? '2px solid var(--gold-primary)' : '2px solid #333',
                      background: selectedKarat === karat ? 'var(--gold-primary)' : 'transparent',
                      color: selectedKarat === karat ? 'var(--bg-main)' : 'var(--text-light)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {karat} Gold
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Calculator */}
            <div style={{background: 'var(--card-bg)', padding: '30px', borderRadius: '12px', border: '1px solid #333'}}>
              <h3 style={{color: 'var(--gold-primary)', marginBottom: '20px', textAlign: 'center'}}>Custom Pricing Calculator</h3>
              
              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--gold-light)'}}>
                  Enter desired weight (grams):
                </label>
                <input 
                  type="number" 
                  value={weight}
                  placeholder="e.g., 8.5" 
                  min="1"
                  step="0.1"
                  onChange={(e) => setWeight(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #333',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    background: 'var(--bg-main)',
                    color: 'var(--text-light)'
                  }}
                />
              </div>

              {weight && weight > 0 && (
                <div className="price-calculator">
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px'}}>
                      Estimated Price: <span className="price-highlight">AED {calculatePrice(parseFloat(weight))}</span>
                    </div>
                    <div style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>
                      Delivery: {getDeliveryDate(product.estimatedDays)}
                    </div>
                    <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px'}}>
                      * Based on {selectedKarat} gold at AED {goldPrices[selectedKarat]}/gram
                    </div>
                  </div>
                </div>
              )}

              <button 
                className="btn-gold"
                onClick={() => setShowInquiry(true)}
                style={{width: '100%', padding: '15px', fontSize: '1.1rem', marginTop: '20px'}}
              >
                💎 Request Custom Creation
              </button>

              <p style={{textAlign: 'center', marginTop: '15px', fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                * Final price may vary based on design complexity
              </p>
            </div>
          </div>
        </div>
      </div>

      {showInquiry && (
        <InquiryForm 
          product={product}
          selectedKarat={selectedKarat}
          currentGoldPrice={goldPrices[selectedKarat]}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  );
};

export default ProductPage;