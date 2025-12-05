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
          if (progress < 0.1) {
            const subProgress = progress / 0.1;
            ring1.style.opacity = subProgress;
            ring1.style.transform = `scale(${1.111 + 0.089 * subProgress})`; 
            ring2.style.opacity = 0;
            setActiveContentStep(1);
          } else if (progress >= 0.1 && progress < 0.35) {
            const subProgress = (progress - 0.1) / 0.25; 
            ring1.style.opacity = 1 - subProgress;
            ring1.style.transform = `scale(${1.2 - 0.3 * subProgress}) rotateY(${30 - 30 * subProgress}deg)`;
            ring2.style.opacity = subProgress;
            ring2.style.transform = `translateY(${100 * (1 - subProgress)}px) scale(${1.0 + 0.2 * subProgress})`;
            
            if (subProgress > 0.5) {
              setActiveContentStep(2);
            } else {
              setActiveContentStep(1);
            }
          } else if (progress >= 0.35) {
            ring1.style.opacity = 0;
            ring2.style.opacity = 1;
            ring2.style.transform = `translateY(0) scale(1.2)`;
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
        const scale = 0.8 + (progress * 0.2);
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
        /* Parallax effect styles from HTML - UPDATED */
        #advanced-parallax {
          background: #0a0a0a; padding: 0; position: relative; height: 200vh; 
        }
        .parallax-wrapper {
          position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex;
        }
        .visual-column {
          width: 50%; position: relative; display: flex; justify-content: center; align-items: center;
        }
        .image-container {
          width: 100%; height: 80%; position: absolute;
          transition: opacity 0.3s, transform 0.3s;
        }
        .image-container img {
          width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.8));
        }
        #ring-1 { opacity: 0; transform: scale(1.111); } 
        #ring-2 { opacity: 0; transform: translateY(100px) scale(1.2); }
        .content-column {
          width: 50%; padding: 10vh 5%; overflow-y: hidden; display: flex;
          flex-direction: column; justify-content: flex-start;
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
          transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }
        .content-step.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .content-step h3 {
          font-family: 'Cinzel', serif; font-size: 2.5rem; color: #f1dda4; margin-bottom: 15px; line-height: 1.2;
        }
        .content-step p { 
          font-size: 1.1rem; 
          color: #a0a0a0; 
          margin-bottom: 20px;
          max-width: 500px;
        }

        /* Second parallax section */
        #advanced-parallax2 {
          background: #0a0a0a; padding: 0; position: relative; height: 100vh; 
        }
        #ring-4 { opacity: 0; transform: scale(0.8); }

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
          padding: 40px;
          background: #1a1a1a;
          border-top: 3px solid #d4af37;
          min-height: 200px;
        }
        .testimonial-rating {
          color: #d4af37;
          margin-bottom: 15px;
          font-size: 1.2rem;
        }
        .testimonial-text {
          font-style: italic;
          font-size: 1.1rem;
          margin-bottom: 20px;
          line-height: 1.6;
          color: #a0a0a0;
        }
        .testimonial-author {
          color: #d4af37;
          font-weight: 600;
          font-size: 1.1rem;
        }
        .carousel-controls {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }
        .carousel-btn {
          background: #d4af37;
          color: #0a0a0a;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        .carousel-btn:hover {
          background: #f1dda4;
          transform: scale(1.1);
        }
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #a0a0a0;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .carousel-dot.active {
          background: #d4af37;
          transform: scale(1.2);
        }

        /* Responsive for parallax - FIXED */
        @media (max-width: 992px) {
          #advanced-parallax, #advanced-parallax2 {
            height: auto !important;
            min-height: 200vh;
          }
          
          .parallax-wrapper {
            flex-direction: column;
            position: static !important;
            height: auto !important;
            min-height: 100vh;
          }
          
          .visual-column, .content-column {
            width: 100% !important;
            padding: 5% !important;
          }
          
          .visual-column {
            height: 60vh !important;
            min-height: 400px;
            position: relative !important;
          }
          
          /* Mobile: Show only one image at a time */
          .image-container {
            position: absolute !important;
            width: 100% !important;
            height: 100% !important;
            transition: opacity 0.5s ease !important;
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
            min-height: 50vh;
            overflow-y: visible !important;
            gap: 40px;
          }
          
          .content-step {
            position: relative !important;
            height: auto !important;
            min-height: 200px;
            margin-bottom: 40px;
            opacity: 0.3 !important;
            transform: none !important;
          }
          
          .content-step.active {
            opacity: 1 !important;
          }
          
          .hero h1 {
            font-size: 3rem;
          }
          
          .content-step h3 {
            font-size: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .content-step h3 {
            font-size: 1.8rem;
          }
          
          .product-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          #advanced-parallax {
            min-height: 150vh;
          }
        }

        @media (max-width: 480px) {
          .hero h1 {
            font-size: 2rem;
          }
          
          .content-step h3 {
            font-size: 1.6rem;
          }
          
          #advanced-parallax {
            min-height: 120vh;
          }
          
          .visual-column {
            height: 50vh !important;
            min-height: 300px;
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
        <p style={{fontSize: '1.1rem', color: '#a0a0a0', maxWidth: '800px', margin: '0 auto'}}>
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
              <p style={{color: '#a0a0a0', marginBottom: '10px', fontSize: '0.9rem'}}>
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
            </div>
            <div className={`content-step ${activeContentStep === 2 ? 'active' : ''}`} data-step="2">
              <h3>Celestial Precision</h3>
              <p>As you scroll, witness how our designs transform from organic warmth to structured elegance.</p>
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
            </div>
          </div>
          <div className="content-column">
            <div className="content-step active" data-step="4">
              <h3>Celebrate Your Forever</h3>
              <p>From the first sketch to the final shine, every wedding ring is handcrafted to capture the beauty of your love story.</p>
              <a href="#full-collection" className="btn-gold" style={{marginTop: '20px', width: 'fit-content'}}>ABOUT US</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL CAROUSEL ===== */}
      <section id="feedback" style={{background: '#111111', padding: '100px 8%'}}>
        <h2 style={{fontSize: '2.5rem', marginBottom: '20px', color: '#d4af37', textAlign: 'center'}}>Client Love</h2>
        
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