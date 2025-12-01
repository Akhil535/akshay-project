import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import w from "../assets/w.png";
const Collection = () => {
  const products = [
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
    },
    {
      id: 4,
      name: "Emerald Heritage",
      price: "Starting from AED 4,800",
      image: img1,
      description: "Vintage emerald design"
    },
    {
      id: 5,
      name: "Zenith Dual Band",
      price: "Starting from AED 3,950",
      image: img2, 
      description: "Modern dual band ring"
    },
    {
      id: 6,
      name: "The Purity Band", 
      price: "Starting from AED 1,900",
      image: "https://www.pngarts.com/files/3/Wedding-Ring-PNG-Transparent-Image.png",
      description: "Classic purity wedding band"
    }
  ];

  return (
    <div style={{paddingTop: '120px'}}>
      <div className="container">
        <h1 className="section-title">The Complete Collection</h1>
        <p className="section-subtitle">Discover our handcrafted jewelry pieces, each telling a unique story</p>
        
        <div className="product-grid">
          {products.map(product => (
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
      </div>
    </div>
  );
};

export default Collection;