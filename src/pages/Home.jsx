import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import w from "../assets/w.png";
import c1 from "../assets/c1.png";

const Home = () => {
  // Refs for parallax effect
  const parallaxSection1Ref = useRef(null);
  const parallaxSection2Ref = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring4Ref = useRef(null);
  const contentColumnRef = useRef(null);

  // Testimonial carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeContentStep, setActiveContentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "The Solstice band is even more stunning in person. It catches the light exactly like the photos promised.",
      author: "Sarah J.",
      rating: 5
    },
    {
      id: 2,
      text: "I was hesitant to buy fine jewellery online, but this website convinced me. The ring is incredibly luxurious.",
      author: "Michael B.",
      rating: 5
    },
    {
      id: 3,
      text: "The customer service team helped me select the perfect size. My fiancée loves the Horizon Promise ring. It's unique and timeless.",
      author: "David K.",
      rating: 5
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "The Solstice Band",
      price: "Starting from AED 2,450",
      image: img1,
      description: "Premium diamond engagement ring"
    },
    {
      id: 2,
      name: "Celestial Diamond", 
      price: "Starting from AED 5,999",
      image: img2,
      description: "Stunning diamond masterpiece"
    },
    {
      id: 3,
      name: "Horizon Promise",
      price: "Starting from AED 3,100", 
      image: w,
      description: "Elegant wedding band"
    }
  ];

  // ===== PARALLAX EFFECT FROM HTML =====
  useEffect(() => {
    const parallaxSection = parallaxSection1Ref.current;
    const ring1 = ring1Ref.current;
    const ring2 = ring2Ref.current;

    if (!parallaxSection || !ring1 || !ring2) return;

    const handleScrollAnimation = () => {
      const rect = parallaxSection.getBoundingClientRect();
      
      if (rect.top + window.innerHeight > 0 && rect.bottom > 0) {
        const sectionHeight = parallaxSection.clientHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / sectionHeight));
        
        // For mobile: show only one image at a time
        if (isMobile) {
          // Mobile: Show ring1 first, then ring2 after scrolling
          if (progress < 0.5) {
            ring1.style.opacity = 1;
            ring1.style.transform = `scale(1)`;
            ring2.style.opacity = 0;
            setActiveContentStep(1);
          } else {
            ring1.style.opacity = 0;
            ring2.style.opacity = 1;
            ring2.style.transform = `scale(1)`;
            setActiveContentStep(2);
          }
        } else {
          // Desktop: Original parallax effect
          if (progress < 0.15) {
            const subProgress = progress / 0.15;
            ring1.style.opacity = subProgress;
            ring1.style.transform = `scale(${1.1 + 0.05 * subProgress})`; 
            ring2.style.opacity = 0;
            setActiveContentStep(1);
          } else if (progress >= 0.15 && progress < 0.5) {
            const subProgress = (progress - 0.15) / 0.35; 
            ring1.style.opacity = 1 - subProgress;
            ring1.style.transform = `scale(${1.15 - 0.15 * subProgress}) rotateY(${20 - 20 * subProgress}deg)`;
            ring2.style.opacity = subProgress;
            ring2.style.transform = `translateY(${80 * (1 - subProgress)}px) scale(${1.0 + 0.15 * subProgress})`;
            
            if (subProgress > 0.5) {
              setActiveContentStep(2);
            } else {
              setActiveContentStep(1);
            }
          } else if (progress >= 0.5) {
            ring1.style.opacity = 0;
            ring2.style.opacity = 1;
            ring2.style.transform = `translateY(0) scale(1.15)`;
            setActiveContentStep(2);
          }
        }
      }
    };

    // Second parallax section
    const handleScrollAnimation2 = () => {
      const parallaxSection2 = parallaxSection2Ref.current;
      const ring4 = ring4Ref.current;

      if (!parallaxSection2 || !ring4) return;

      const rect = parallaxSection2.getBoundingClientRect();
      
      if (rect.top + window.innerHeight > 0 && rect.bottom > 0) {
        const sectionHeight = parallaxSection2.clientHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / sectionHeight));
        const opacity = Math.min(1, progress * 3);
        const scale = 0.85 + (progress * 0.15);
        ring4.style.opacity = opacity;
        ring4.style.transform = `scale(${scale})`;
      }
    };

    const handleScroll = () => {
      if (window.innerWidth > 992) {
        handleScrollAnimation();
        handleScrollAnimation2();
      } else {
        // Mobile: call animation but with mobile logic
        handleScrollAnimation();
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // ===== INFINITE TESTIMONIAL CAROUSEL =====
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div>
      {/* Add CSS for parallax and carousel */}
      <style>{`
        /* Parallax effect styles from HTML - UPDATED with reduced space */
        #advanced-parallax {
          background: #0a0a0a; 
          padding: 0; 
          position: relative; 
          height: 160vh;  /* Reduced from 200vh */
        }
        .parallax-wrapper {
          position: sticky; 
          top: 0; 
          height: 100vh; 
          overflow: hidden; 
          display: flex;
        }
        .visual-column {
          width: 50%; 
          position: relative; 
          display: flex; 
          justify-content: center; 
          align-items: center;
        }
        .image-container {
          width: 100%; 
          height: 70%;  /* Reduced from 80% */
          position: absolute;
          transition: opacity 0.3s, transform 0.3s;
        }
        .image-container img {
          width: 100%; 
          height: 100%; 
          object-fit: contain; 
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.7));  /* Reduced shadow */
        }
        #ring-1 { opacity: 0; transform: scale(1.1); } 
        #ring-2 { opacity: 0; transform: translateY(80px) scale(1.1); }
        .content-column {
          width: 50%; 
          padding: 8vh 5%;  /* Reduced padding */
          overflow-y: hidden; 
          display: flex;
          flex-direction: column; 
          justify-content: flex-start;
          position: relative;
        }
        .content-step {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);  /* Reduced from 30px */
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
        }
        .content-step.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .content-step h3 {
          font-family: 'Cinzel', serif; 
          font-size: 2.3rem;  /* Slightly reduced */
          color: #f1dda4; 
          margin-bottom: 12px; 
          line-height: 1.2;
        }
        .content-step p { 
          font-size: 1rem;  /* Slightly reduced */
          color: #a0a0a0; 
          margin-bottom: 16px;
          max-width: 450px;
          line-height: 1.5;
        }

        /* Second parallax section */
        #advanced-parallax2 {
          background: #0a0a0a; 
          padding: 0; 
          position: relative; 
          height: 100vh; 
        }
        #ring-4 { opacity: 0; transform: scale(0.85); }

        /* Client Logos Section */
        .client-logos-section {
          background: linear-gradient(135deg, #f1dda4 0%, #d4af37 50%, #b8941f 100%);
          padding: 60px 5%;  /* Reduced padding */
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .client-logos-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
        }
        
        .client-logos-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
        }

        /* Testimonial carousel styles */
        .testimonial-carousel-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden;
        }
        .testimonial-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }
        .testimonial-slide {
          flex: 0 0 100%;
          padding: 35px;  /* Reduced padding */
          background: #1a1a1a;
          border-top: 2px solid #d4af37;  /* Thinner border */
          min-height: 180px;  /* Reduced height */
        }
        .testimonial-rating {
          color: #d4af37;
          margin-bottom: 12px;
          font-size: 1.1rem;
        }
        .testimonial-text {
          font-style: italic;
          font-size: 1rem;  /* Slightly reduced */
          margin-bottom: 16px;
          line-height: 1.5;
          color: #a0a0a0;
        }
        .testimonial-author {
          color: #d4af37;
          font-weight: 600;
          font-size: 1rem;
        }
        .carousel-controls {
          display: flex;
          justify-content: center;
          gap: 15px;  /* Reduced gap */
          margin-top: 25px;
        }
        .carousel-btn {
          background: #d4af37;
          color: #0a0a0a;
          border: none;
          width: 45px;  /* Smaller buttons */
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }
        .carousel-btn:hover {
          background: #f1dda4;
          transform: scale(1.05);  /* Reduced hover scale */
        }
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;  /* Reduced gap */
          margin-top: 18px;
        }
        .carousel-dot {
          width: 10px;  /* Smaller dots */
          height: 10px;
          border-radius: 50%;
          background: #a0a0a0;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .carousel-dot.active {
          background: #d4af37;
          transform: scale(1.1);  /* Reduced scale */
        }

        /* Responsive for parallax - FIXED */
        @media (max-width: 992px) {
          #advanced-parallax, #advanced-parallax2 {
            height: auto !important;
            min-height: 140vh;  /* Reduced mobile height */
          }
          
          .parallax-wrapper {
            flex-direction: column;
            position: static !important;
            height: auto !important;
            min-height: 80vh;  /* Reduced mobile height */
          }
          
          .visual-column, .content-column {
            width: 100% !important;
            padding: 4% !important;  /* Reduced padding */
          }
          
          .visual-column {
            height: 50vh !important;  /* Reduced height */
            min-height: 350px;
            position: relative !important;
          }
          
          /* Mobile: Show only one image at a time */
          .image-container {
            position: absolute !important;
            width: 100% !important;
            height: 100% !important;
            transition: opacity 0.4s ease !important;
          }
          
          /* Mobile: First image visible by default */
          #ring-1 { 
            opacity: 1 !important;
            transform: scale(1) !important;
          }
          
          /* Mobile: Second image hidden by default */
          #ring-2 { 
            opacity: 0 !important;
            transform: scale(1) !important;
            visibility: visible !important;
          }
          
          #ring-4 { 
            opacity: 1 !important;
            transform: scale(1) !important;
          }
          
          .content-column {
            height: auto !important;
            min-height: 40vh;  /* Reduced height */
            overflow-y: visible !important;
            gap: 30px;  /* Reduced gap */
          }
          
          .content-step {
            position: relative !important;
            height: auto !important;
            min-height: 180px;  /* Reduced height */
            margin-bottom: 30px;
            opacity: 0.3 !important;
            transform: none !important;
          }
          
          .content-step.active {
            opacity: 1 !important;
          }
          
          .hero h1 {
            font-size: 2.8rem;  /* Slightly reduced */
          }
          
          .content-step h3 {
            font-size: 1.8rem;  /* Reduced */
          }
          
          .client-logos-section {
            padding: 50px 4%;  /* Reduced padding for mobile */
          }
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.3rem;
          }
          
          .content-step h3 {
            font-size: 1.6rem;
          }
          
          .product-grid {
            grid-template-columns: 1fr;
            gap: 25px;  /* Reduced gap */
          }
          
          #advanced-parallax {
            min-height: 120vh;  /* Reduced */
          }
          
          .client-logos-section {
            padding: 40px 3%;
          }
          
          .client-logos-section h4 {
            font-size: 1.1rem;
            margin-bottom: 30px;
          }
          
          .client-logos-section span {
            font-size: 1.4rem;
            letter-spacing: 2px;
          }
        }

        @media (max-width: 480px) {
          .hero h1 {
            font-size: 1.8rem;
          }
          
          .content-step h3 {
            font-size: 1.4rem;
          }
          
          #advanced-parallax {
            min-height: 100vh;  /* Reduced */
          }
          
          .visual-column {
            height: 40vh !important;
            min-height: 250px;
          }
          
          .client-logos-section {
            padding: 30px 2%;
          }
          
          .client-logos-section h4 {
            font-size: 1rem;
            margin-bottom: 20px;
          }
          
          .client-logos-section span {
            font-size: 1.1rem;
            letter-spacing: 1px;
          }
          
          .client-logos-section > div {
            gap: 20px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Elegance Born From Nature</h1>
          <p>Discover custom jewelry crafted to capture your unique story. Every piece is made to order with premium materials.</p>
          <Link to="/collection" className="btn-gold">Explore Collection</Link>
        </div>
      </section>

      {/* Story Section */}
      <section className="simple-section" style={{background: '#111111'}}>
        <h2 className="section-title">The Aura Philosophy</h2>
        <div className="section-divider"></div>
        <p style={{fontSize: '1rem', color: '#a0a0a0', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6'}}>
          We believe true luxury isn't just about shine; it's about the story. Our pieces are inspired by the organic beauty of the natural world—the way sunlight hits a golden field or the unbreakable strength of a diamond. Each piece is custom-made to your specifications.
        </p>
      </section>

      {/* Featured Products */}
      <section className="simple-section">
        <h2 className="section-title">Featured Collection</h2>
        <p className="section-subtitle">Handcrafted pieces that tell your unique story</p>
        
        <div className="product-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p style={{color: '#a0a0a0', marginBottom: '8px', fontSize: '0.85rem', lineHeight: '1.4'}}>
                {product.description}
              </p>
              <span className="product-price">{product.price}</span>
              <Link to={`/product/${product.id}`} className="btn-outline">
                Customize This Piece
              </Link>
            </div>
          ))}
        </div>
      </section>

     {/* ===== PARALLAX SECTION 1 ===== */}
<section id="advanced-parallax" ref={parallaxSection1Ref}>
  <div className="parallax-wrapper">
    <div className="visual-column">
      <div id="ring-1" className="image-container" ref={ring1Ref}>
        <img src={img1} alt="Gold Solstice Ring" />
      </div>
      <div id="ring-2" className="image-container" ref={ring2Ref}>
        <img src={img2} alt="Diamond Celestial Ring" />
      </div>
    </div>
    <div className="content-column" ref={contentColumnRef}>
      <div className={`content-step ${activeContentStep === 1 ? 'active' : ''}`} data-step="1">
        <h3>The Golden Solstice</h3>
        <p>Our signature ring, inspired by the year's longest day. Each curve captures the warmth of summer sunlight.</p>
        <div className="content-features">
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <span className="feature-text">24K Gold Plating</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <span className="feature-text">Conflict-Free Diamonds</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <span className="feature-text">Hand-Polished Finish</span>
          </div>
        </div>
        <Link to="/product/1" className="btn-outline" style={{marginTop: '20px', width: 'fit-content', marginLeft: '0'}}>
          View Details
        </Link>
      </div>
      <div className={`content-step ${activeContentStep === 2 ? 'active' : ''}`} data-step="2">
        <h3>Celestial Precision</h3>
        <p>As you scroll, witness how our designs transform from organic warmth to structured elegance.</p>
        <div className="content-features">
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <span className="feature-text">Precision Cut Gems</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <span className="feature-text">Platinum Setting</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <span className="feature-text">Lifetime Warranty</span>
          </div>
        </div>
        <Link to="/product/2" className="btn-outline" style={{marginTop: '20px', width: 'fit-content' , marginLeft: '0'}}>
          Explore Design
        </Link>
      </div>
    </div>
  </div>
</section>

{/* ===== PARALLAX SECTION 2 ===== */}
<section id="advanced-parallax2" ref={parallaxSection2Ref}>
  <div className="parallax-wrapper">
    <div className="visual-column">
      <div id="ring-4" className="image-container" ref={ring4Ref}>
        <img src={c1 || img1} alt="Gold Ring" />
        <div className="ring-overlay-info">
          <span className="overlay-text">Limited Edition</span>
          <span className="overlay-text">Handcrafted</span>
        </div>
      </div>
    </div>
    <div className="content-column">
      <div className="content-step active" data-step="4">
        <h3>Celebrate Your Forever</h3>
        <p>From the first sketch to the final shine, every wedding ring is handcrafted to capture the beauty of your love story.</p>
        
        <div className="wedding-features">
          <div className="wedding-feature">
            <h4>Custom Engraving</h4>
            <p>Add your special date or message inside the band</p>
          </div>
          <div className="wedding-feature">
            <h4>Perfect Fit Guarantee</h4>
            <p>Free resizing within the first year</p>
          </div>
          <div className="wedding-feature">
            <h4>Complimentary Consultation</h4>
            <p>One-on-one design session with our experts</p>
          </div>
        </div>
        
        <div className="cta-buttons">
          <Link to="/wedding-rings" className="btn-gold" style={{padding: '12px 28px'}}>
            View Collection
          </Link>
          <Link to="/book-consultation" className="btn-outline" style={{padding: '12px 28px', marginLeft: '15px'}}>
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ===== CLIENT LOGOS ===== */}
      <section className="client-logos-section">
        <div className="client-logos">
          <h4 style={{
            color: '#0a0a0a', 
            marginBottom: '40px', 
            letterSpacing: '2px', 
            fontSize: '1.1rem', 
            textTransform: 'uppercase',
            fontFamily: "'Cinzel', serif",
            fontWeight: '600'
          }}>
            AS SEEN IN
          </h4>
          <div style={{
            display: 'flex', 
            justifyContent: 'space-around', 
            flexWrap: 'wrap', 
            gap: '30px', 
            alignItems: 'center', 
            maxWidth: '1100px', 
            margin: '0 auto'
          }}>
            <span style={{
              fontFamily: "'Cinzel', serif", 
              fontWeight: '700', 
              fontSize: '1.6rem', 
              color: '#0a0a0a', 
              opacity: '0.85', 
              textTransform: 'uppercase', 
              letterSpacing: '2.5px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '2px'
            }} 
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.85';
              e.target.style.transform = 'translateY(0)';
              e.target.style.textShadow = 'none';
            }}
            >
              VOGUE
            </span>
            
            <span style={{
              fontFamily: "'Cinzel', serif", 
              fontWeight: '700', 
              fontSize: '1.6rem', 
              color: '#0a0a0a', 
              opacity: '0.85', 
              textTransform: 'uppercase', 
              letterSpacing: '2.5px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '2px'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.85';
              e.target.style.transform = 'translateY(0)';
              e.target.style.textShadow = 'none';
            }}
            >
              HARPER'S BAZAAR
            </span>
            
            <span style={{
              fontFamily: "'Cinzel', serif", 
              fontWeight: '700', 
              fontSize: '1.6rem', 
              color: '#0a0a0a', 
              opacity: '0.85', 
              textTransform: 'uppercase', 
              letterSpacing: '2.5px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '2px'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.85';
              e.target.style.transform = 'translateY(0)';
              e.target.style.textShadow = 'none';
            }}
            >
              THE NEW YORK TIMES
            </span>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL CAROUSEL ===== */}
      <section id="feedback" style={{background: '#111111', padding: '80px 6%'}}>
        <h2 style={{
          fontSize: '2.2rem', 
          marginBottom: '16px', 
          color: '#d4af37', 
          textAlign: 'center',
          fontFamily: "'Cinzel', serif"
        }}>
          Client Love
        </h2>
        
        <div className="testimonial-carousel-container">
          <div className="testimonial-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <h4 className="testimonial-author">{testimonial.author}</h4>
              </div>
            ))}
          </div>
          
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={prevTestimonial}>❮</button>
            <button className="carousel-btn" onClick={nextTestimonial}>❯</button>
          </div>
          
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTestimonial(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;