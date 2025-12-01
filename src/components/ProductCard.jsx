import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import InquiryForm from '../components/InquiryForm'

// Import placeholder images - replace these with your actual images
const productImages = {
  1: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
  2: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
  3: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
  4: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop",
  5: "https://images.unsplash.com/photo-1588444650700-6c7f0c89d36b?w=600&h=600&fit=crop",
  6: "https://images.unsplash.com/photo-1596944946757-6a5f366ad5ff?w=600&h=600&fit=crop"
}

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [showInquiry, setShowInquiry] = useState(false)
  const [weight, setWeight] = useState('')
  const [selectedKarat, setSelectedKarat] = useState('22K')

  // UAE Gold Prices (AED per gram)
  const goldPrices = {
    '24K': 250,
    '22K': 230,
    '18K': 190
  }

  const products = [
    {
      id: 1,
      name: "Diamond Engagement Ring",
      category: "Rings",
      description: "Create your perfect engagement ring with premium diamonds. Choose from various diamond cuts and gold types to match your unique love story. Our expert craftsmen will bring your vision to life with meticulous attention to detail.",
      makingCharge: 35,
      estimatedDays: 10,
      features: ["Premium GIA Certified Diamonds", "18K/22K Gold Options", "Custom Design Consultation", "Lifetime Warranty", "Free Resizing"],
      availableKarats: ['18K', '22K', '24K']
    },
    {
      id: 2,
      name: "Gold Pearl Necklace",
      category: "Necklaces",
      description: "Elegant gold necklace featuring high-quality freshwater pearls. Perfect for special occasions or everyday luxury. Customize the length, pearl size, and gold purity to create your signature piece.",
      makingCharge: 25,
      estimatedDays: 7,
      features: ["Freshwater Pearls", "Adjustable Length", "22K/18K Gold", "Secure Clasp", "Gift Packaging"],
      availableKarats: ['18K', '22K']
    },
    {
      id: 3,
      name: "Sapphire Earrings",
      category: "Earrings",
      description: "Stunning sapphire earrings set in white or yellow gold. Available in various sapphire shades and cutting styles. Lightweight and comfortable for daily wear.",
      makingCharge: 18,
      estimatedDays: 8,
      features: ["Natural Sapphires", "White/Yellow Gold", "Hypoallergenic", "Lightweight Design", "Multiple Size Options"],
      availableKarats: ['18K', '22K']
    },
    {
      id: 4,
      name: "Custom Wedding Band",
      category: "Rings",
      description: "Personalized wedding bands with optional engraving. Choose from various widths, finishes, and accent stones to symbolize your commitment.",
      makingCharge: 20,
      estimatedDays: 6,
      features: ["Free Engraving", "Multiple Widths", "Comfort Fit", "Diamond Accents Available", "Matching Sets"],
      availableKarats: ['18K', '22K', '24K']
    },
    {
      id: 5,
      name: "Emerald Bracelet",
      category: "Bracelets",
      description: "Luxurious emerald bracelet with diamond accents. Features vibrant Colombian emeralds in a secure and comfortable setting.",
      makingCharge: 40,
      estimatedDays: 12,
      features: ["Colombian Emeralds", "Diamond Accents", "Secure Clasp", "Adjustable Length", "Premium Packaging"],
      availableKarats: ['18K', '22K']
    },
    {
      id: 6,
      name: "Ruby Pendant",
      category: "Necklaces",
      description: "Vibrant ruby pendant on a high-quality gold chain. Choose your preferred chain length and ruby size for a personalized statement piece.",
      makingCharge: 30,
      estimatedDays: 9,
      features: ["Natural Rubies", "Gold Chain Included", "Multiple Chain Lengths", "Secure Bail", "Gift Ready"],
      availableKarats: ['18K', '22K']
    }
  ]

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      navigate('/collection')
    }
  }, [id, navigate])

  const getCurrentGoldPrice = () => {
    return goldPrices[selectedKarat] || goldPrices['22K']
  }

  const calculatePrice = (grams) => {
    if (!grams || grams <= 0 || !product) return '0'
    const goldPrice = getCurrentGoldPrice()
    const goldValue = grams * goldPrice
    const makingCost = grams * product.makingCharge
    return (goldValue + makingCost).toFixed(2)
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div style={{ paddingTop: '150px', textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }

  const currentGoldPrice = getCurrentGoldPrice()

  return (
    <div>
      <Header />
      
      <section className="product-detail">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">Home</Link> &gt; <Link to="/collection">Collection</Link> &gt; <span style={{ color: 'var(--gold-primary)' }}>{product.name}</span>
          </div>

          <div className="product-detail-grid">
            {/* Product Image */}
            <motion.div 
              className="product-detail-image"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={productImages[product.id] || productImages[1]} 
                alt={product.name}
                onError={(e) => {
                  e.target.style.display = 'none'
                  const fallback = document.createElement('div')
                  fallback.style.cssText = `
                    font-size: 6rem;
                    color: var(--gold-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                  `
                  fallback.innerHTML = product.category === 'Rings' ? '💍' : 
                                     product.category === 'Necklaces' ? '📿' : 
                                     product.category === 'Earrings' ? '👂' : '💎'
                  e.target.parentNode.appendChild(fallback)
                }}
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="product-detail-info-h1">{product.name}</h1>
              <p className="product-detail-category">{product.category}</p>
              <p className="product-detail-description">{product.description}</p>

              {/* Features */}
              <div className="features-list">
                <h3>Features & Benefits:</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Gold Karat Selection */}
              <div className="karat-selection">
                <h3 style={{ color: 'var(--gold-primary)', marginBottom: '15px' }}>Select Gold Purity:</h3>
                <div className="karat-options">
                  {product.availableKarats.map(karat => (
                    <button
                      key={karat}
                      className={`karat-option ${selectedKarat === karat ? 'active' : ''}`}
                      onClick={() => setSelectedKarat(karat)}
                    >
                      {karat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculator */}
              <div className="pricing-calculator">
                <h3 style={{ color: 'var(--gold-primary)', marginBottom: '20px' }}>Calculate Your Price</h3>
                
                <div className="weight-input">
                  <label>Enter desired weight (grams):</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g., 8.5"
                    min="1"
                    step="0.1"
                  />
                </div>

                {weight && weight > 0 && (
                  <div className="price-result">
                    <div className="estimated-price">
                      AED {calculatePrice(parseFloat(weight))}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Based on {selectedKarat} gold at AED {currentGoldPrice}/g
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <motion.button 
                onClick={() => setShowInquiry(true)}
                className="btn-gold"
                style={{ width: '100%', fontSize: '1.1rem', padding: '20px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Custom Creation
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {showInquiry && (
        <InquiryForm 
          product={product}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  )
}

export default ProductPage