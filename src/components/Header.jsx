import React from 'react';
import { Link } from 'react-router-dom';
const DiamondIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);
const Header = () => {
  return (
    <header className="header">
      <div className="logo"><Link to="/"><DiamondIcon style={{display: 'inline-block', marginRight: '10px', verticalAlign: 'middle'}}/>AURA.</Link></div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/collection">Collection</Link></li>
          <li><a href="#story">Our Story</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;