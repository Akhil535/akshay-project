import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import w from "../assets/w.png";

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "The Solstice Band",
      price: "Starting from AED 2,450",
      image: img1, // Remove the curly braces
      description: "Premium diamond engagement ring"
    },
    {
      id: 2,
      name: "Celestial Diamond", 
      price: "Starting from AED 5,999",
      image: img2, // Remove the curly braces
      description: "Stunning diamond masterpiece"
    },
    {
      id: 3,
      name: "Horizon Promise",
      price: "Starting from AED 3,100", 
      image: w, // Remove the curly braces
      description: "Elegant wedding band"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Elegance Born From Nature</h1>
          <p>Discover custom jewelry crafted to capture your unique story. Every piece is made to order with premium materials.</p>
          <Link to="/collection" className="btn-gold">Explore Collection</Link>
        </div>
      </section>

      {/* Story Section */}
      <section className="simple-section" style={{background: 'var(--bg-secondary)'}}>
        <h2>The Aura Philosophy</h2>
        <div className="section-divider"></div>
        <p style={{fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto'}}>
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
              <p style={{color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem'}}>
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

      {/* Image + Text Section 1 */}
      <section className="image-text-section" style={{background: 'var(--bg-secondary)'}}>
        <div>
          <img src={img1} alt="Custom Jewelry Design" />
        </div>
        <div className="image-text-content">
          <h3>Create Your Perfect Piece</h3>
          <p>Every jewelry piece tells a story. Work with our master craftsmen to create custom designs that reflect your personal style and celebrate your special moments.</p>
          <Link to="/collection" className="btn-gold">Start Your Design</Link>
        </div>
      </section>

      {/* Image + Text Section 2 */}
      <section className="image-text-section">
        <div className="image-text-content">
          <h3>Celebrate Your Forever</h3>
          <p>From the first sketch to the final polish, every piece is handcrafted with precision and care. Choose the design that reflects your promise and memories.</p>
          <Link to="/collection" className="btn-gold">View Wedding Collection</Link>
        </div>
        <div>
          <img src={img2} alt="Wedding Collection" />
        </div>
      </section>

      {/* Image + Text Section 3 */}
      <section className="image-text-section" style={{background: 'var(--bg-secondary)'}}>
        <div>
          <img src={w} alt="Premium Craftsmanship" />
        </div>
        <div className="image-text-content">
          <h3>Uncompromising Quality</h3>
          <p>Our master jewelers combine traditional techniques with modern innovation to create pieces that stand the test of time and capture your unique essence.</p>
          <Link to="/collection" className="btn-gold">Discover Craftsmanship</Link>
        </div>
      </section>

      {/* Client Logos */}
      <div className="client-logos">
        <h4 style={{color: 'var(--bg-main)', marginBottom: '30px', letterSpacing: '2px'}}>AS SEEN IN</h4>
        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px', alignItems: 'center'}}>
          <span style={{fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.5rem', color: 'var(--bg-main)', opacity: '0.7', textTransform: 'uppercase', letterSpacing: '4px'}}>VOGUE</span>
          <span style={{fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.5rem', color: 'var(--bg-main)', opacity: '0.7', textTransform: 'uppercase', letterSpacing: '4px'}}>HARPER'S BAZAAR</span>
          <span style={{fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.5rem', color: 'var(--bg-main)', opacity: '0.7', textTransform: 'uppercase', letterSpacing: '4px'}}>THE NEW YORK TIMES</span>
        </div>
      </div>

      {/* Final CTA */}
      <section style={{background: 'var(--bg-secondary)', padding: '80px 8%', textAlign: 'center'}}>
        <h2 style={{fontSize: '2.8rem', color: 'var(--gold-light)', marginBottom: '20px'}}>Ready to Begin Your Legacy?</h2>
        <p style={{fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px'}}>
          Explore our collection and create your custom jewelry piece today.
        </p>
        <Link to="/collection" className="btn-gold">Start Customizing</Link>
      </section>
    </div>
  );
};

export default Home;