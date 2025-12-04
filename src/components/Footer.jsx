import React from 'react';
import { Link } from 'react-router-dom';

// SVG Icons
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{marginBottom: '20px'}}>
              <DiamondIcon style={{display: 'inline-block', marginRight: '10px', verticalAlign: 'middle'}}/>
              AURA.
            </div>
            <p className="footer-description">
              Crafting timeless jewellery inspired by the raw beauty of nature. Based in Dubai, shipped worldwide.
            </p>
            <div className="footer-address">
              <div className="address-icon">
                <LocationIcon />
              </div>
              <div>
                <h5 style={{color: 'var(--gold-light)', marginBottom: '5px'}}>Visit Our Atelier</h5>
                <p style={{color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6'}}>
                  Gold & Diamond Park<br />
                  Dubai Gold Souq<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 style={{color: 'var(--gold-primary)', marginBottom: '25px'}}>Collections</h4>
            <ul style={{listStyle: 'none'}}>
              <li style={{marginBottom: '12px'}}>
                <Link to="/collection" className="footer-link">
                  <span className="link-icon"></span> Engagement Rings
                </Link>
              </li>
              <li style={{marginBottom: '12px'}}>
                <Link to="/collection" className="footer-link">
                  <span className="link-icon"></span> Diamond Rings
                </Link>
              </li>
              <li style={{marginBottom: '12px'}}>
                <Link to="/collection" className="footer-link">
                  <span className="link-icon"></span> Wedding Bands
                </Link>
              </li>
              <li style={{marginBottom: '12px'}}>
                <Link to="/collection" className="footer-link">
                  <span className="link-icon"></span> Custom Designs
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 style={{color: 'var(--gold-primary)', marginBottom: '25px'}}>Craftsmanship</h4>
            <ul style={{listStyle: 'none'}}>
              <li style={{marginBottom: '12px'}}>
                <Link to="/story" className="footer-link">
                  <span className="link-icon"></span> Our Story
                </Link>
              </li>
              <li style={{marginBottom: '12px'}}>
                <Link to="/craftsmanship" className="footer-link">
                  <span className="link-icon"></span> The Process
                </Link>
              </li>
              <li style={{marginBottom: '12px'}}>
                <Link to="/materials" className="footer-link">
                  <span className="link-icon"></span> Premium Materials
                </Link>
              </li>
              <li style={{marginBottom: '12px'}}>
                <Link to="/care" className="footer-link">
                  <span className="link-icon"></span> Jewellery Care
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4 style={{color: 'var(--gold-primary)', marginBottom: '25px'}}>Contact</h4>
            <div className="contact-info">
              <div className="contact-item" style={{marginBottom: '15px'}}>
                <div className="contact-icon">
                  <PhoneIcon />
                </div>
                <div>
                  <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>By Appointment</div>
                  <a href="tel:+97144443322" className="contact-link">+971 4 444 3322</a>
                </div>
              </div>
              <div className="contact-item" style={{marginBottom: '15px'}}>
                <div className="contact-icon">
                  <EmailIcon />
                </div>
                <div>
                  <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>For Inquiries</div>
                  <a href="mailto:bespoke@aura-jewellery.com" className="contact-link">bespoke@aura-jewellery.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <ClockIcon />
                </div>
                <div>
                  <div style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Atelier Hours</div>
                  <div style={{color: 'var(--gold-light)', fontSize: '0.95rem'}}>Mon-Sat: 10AM-8PM</div>
                </div>
              </div>
            </div>
            <div className="social-links" style={{marginTop: '25px'}}>
              <a href="#" className="social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="social-link" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <PinterestIcon />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 AURA Jewellery Dubai. All rights reserved.</p>
            <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px'}}>
              Each piece is meticulously handcrafted in our Dubai atelier
            </p>
          </div>
          <div className="footer-legal">
            <Link to="/privacy" className="legal-link">Privacy Policy</Link>
            <span style={{color: 'var(--gold-primary)', margin: '0 10px'}}>•</span>
            <Link to="/terms" className="legal-link">Terms of Service</Link>
            <span style={{color: 'var(--gold-primary)', margin: '0 10px'}}>•</span>
            <Link to="/shipping" className="legal-link">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;