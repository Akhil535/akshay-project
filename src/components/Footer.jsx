import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div style={{color: 'var(--text-muted)'}}>
          <div className="logo" style={{marginBottom: '20px'}}>AURA.</div>
          <p>Crafting timeless jewellery inspired by the raw beauty of nature. Based in Dubai, shipped worldwide.</p>
        </div>
        <div>
          <h4 style={{color: 'var(--gold-primary)', marginBottom: '25px'}}>Quick Links</h4>
          <ul style={{listStyle: 'none'}}>
            <li style={{marginBottom: '10px'}}><Link to="/collection">The Collection</Link></li>
            <li style={{marginBottom: '10px'}}><a href="#story">Our Story</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{color: 'var(--gold-primary)', marginBottom: '25px'}}>Client Care</h4>
          <ul style={{listStyle: 'none'}}>
            <li style={{marginBottom: '10px'}}><a href="#contact">Contact Us</a></li>
            <li style={{marginBottom: '10px'}}><a href="#shipping">Shipping & Returns</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{color: 'var(--gold-primary)', marginBottom: '25px'}}>The AURA List</h4>
          <p>Sign up for exclusive drops.</p>
          <form style={{display: 'flex', marginTop: '15px'}}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{
                padding: '15px', 
                background: '#222', 
                border: '1px solid #333', 
                color: '#fff', 
                flexGrow: '1', 
                outline: 'none',
                borderRadius: '4px 0 0 4px'
              }}
            />
            <button 
              type="submit" 
              style={{
                padding: '15px 20px', 
                background: 'var(--gold-primary)', 
                border: 'none', 
                color: 'var(--bg-main)', 
                cursor: 'pointer',
                borderRadius: '0 4px 4px 0'
              }}
            >
              JOIN
            </button>
          </form>
        </div>
      </div>
      <div style={{textAlign: 'center', paddingTop: '30px', borderTop: '1px solid #222', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
        <p>&copy; 2024 AURA Jewellery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;