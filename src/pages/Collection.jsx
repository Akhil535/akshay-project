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
      description: "Premium diamond engagement ring",
      category: "Engagement"
    },
    {
      id: 2,
      name: "Celestial Diamond", 
      price: "Starting from AED 5,999",
      image: img2,
      description: "Stunning diamond masterpiece",
      category: "Luxury"
    },
    {
      id: 3,
      name: "Horizon Promise",
      price: "Starting from AED 3,100", 
      image: w,
      description: "Elegant wedding band",
      category: "Wedding"
    },
    {
      id: 4,
      name: "Emerald Heritage",
      price: "Starting from AED 4,800",
      image: img1,
      description: "Vintage emerald design",
      category: "Vintage"
    },
    {
      id: 5,
      name: "Zenith Dual Band",
      price: "Starting from AED 3,950",
      image: img2, 
      description: "Modern dual band ring",
      category: "Modern"
    },
    {
      id: 6,
      name: "The Purity Band", 
      price: "Starting from AED 1,900",
      image: "https://www.pngarts.com/files/3/Wedding-Ring-PNG-Transparent-Image.png",
      description: "Classic purity wedding band",
      category: "Classic"
    },
    {
      id: 7,
      name: "Aurora Diamond",
      price: "Starting from AED 6,500",
      image: img1,
      description: "Exclusive diamond collection",
      category: "Luxury"
    },
    {
      id: 8,
      name: "Golden Eclipse",
      price: "Starting from AED 3,800",
      image: img2,
      description: "Gold and diamond combination",
      category: "Modern"
    },
    {
      id: 9,
      name: "Royal Heritage",
      price: "Starting from AED 7,200",
      image: w,
      description: "Royal inspired design",
      category: "Luxury"
    },
    {
      id: 10,
      name: "Modern Minimalist",
      price: "Starting from AED 2,200",
      image: img1,
      description: "Simple and elegant design",
      category: "Modern"
    },
    {
      id: 11,
      name: "Vintage Bloom",
      price: "Starting from AED 4,500",
      image: img2,
      description: "Floral vintage design",
      category: "Vintage"
    },
    {
      id: 12,
      name: "Eternal Promise",
      price: "Starting from AED 3,600",
      image: w,
      description: "Symbol of eternal love",
      category: "Wedding"
    }
  ];

  // Categories for filtering
  const categories = ["All", "Engagement", "Wedding", "Luxury", "Vintage", "Modern", "Classic"];

  return (
    <div className="collection-page">
      <style>{`
        .collection-page {
          min-height: 100vh;
          background: #0a0a0a;
          padding-top: 80px;
        }
        
        .collection-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 8%;
        }
        
        .collection-header {
          text-align: center;
          padding: 60px 0 40px;
          margin-bottom: 40px;
        }
        
        .collection-title {
          font-family: 'Cinzel', serif;
          font-size: 3.5rem;
          color: #d4af37;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }
        
        .collection-subtitle {
          font-size: 1.2rem;
          color: #a0a0a0;
          max-width: 700px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }
        
        .category-filter {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 50px;
          padding: 20px 0;
        }
        
        .category-btn {
          padding: 12px 30px;
          background: transparent;
          border: 1px solid #d4af37;
          color: #d4af37;
          font-family: 'Lato', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 30px;
          font-size: 0.9rem;
        }
        
        .category-btn:hover,
        .category-btn.active {
          background: #d4af37;
          color: #0a0a0a;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }
        
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }
        
        .product-card {
          background: #1a1a1a;
          border: 1px solid #222;
          padding: 25px;
          text-align: center;
          transition: all 0.3s ease;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .product-card:hover {
          transform: translateY(-10px);
          border-color: #d4af37;
          box-shadow: 0 15px 30px rgba(212, 175, 55, 0.1);
        }
        
        .product-card img {
          width: 100%;
          height: 220px;
          object-fit: contain;
          margin-bottom: 20px;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
        }
        
        .product-card h4 {
          font-family: 'Cinzel', serif;
          font-size: 1.4rem;
          color: #f1dda4;
          margin-bottom: 10px;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .product-category {
          display: inline-block;
          padding: 5px 15px;
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
          font-size: 0.8rem;
          border-radius: 20px;
          margin-bottom: 15px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .product-description {
          color: #a0a0a0;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 15px;
          flex-grow: 1;
        }
        
        .product-price {
          color: #d4af37;
          font-weight: 700;
          font-size: 1.3rem;
          margin: 15px 0;
          display: block;
        }
        
        .btn-outline {
          padding: 12px 30px;
          border: 1px solid #d4af37;
          color: #d4af37;
          background: transparent;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          font-size: 0.9rem;
          border-radius: 5px;
          margin-top: 10px;
        }
        
        .btn-outline:hover {
          background: #d4af37;
          color: #0a0a0a;
        }
        
        .collection-empty {
          text-align: center;
          padding: 80px 20px;
          color: #a0a0a0;
          font-size: 1.2rem;
          grid-column: 1 / -1;
        }
        
        .view-more {
          text-align: center;
          padding: 40px 0 80px;
        }
        
        .btn-gold {
          padding: 15px 40px;
          background: #d4af37;
          color: #0a0a0a;
          border: none;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.4s ease;
          display: inline-block;
          text-decoration: none;
          font-size: 1rem;
        }
        
        .btn-gold:hover {
          background: #f1dda4;
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.6);
        }
        
        @media (max-width: 992px) {
          .collection-title {
            font-size: 2.8rem;
          }
          
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
          }
        }
        
        @media (max-width: 768px) {
          .collection-container {
            padding: 0 5%;
          }
          
          .collection-title {
            font-size: 2.2rem;
          }
          
          .collection-subtitle {
            font-size: 1rem;
            padding: 0 5%;
          }
          
          .category-filter {
            gap: 10px;
          }
          
          .category-btn {
            padding: 10px 20px;
            font-size: 0.85rem;
          }
          
          .product-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }
      `}</style>

      <div className="collection-container">
        {/* Collection Header */}
        <div className="collection-header">
          <h1 className="collection-title">The Complete Collection</h1>
          <p className="collection-subtitle">
            Discover our exquisite handcrafted jewelry pieces, each meticulously designed to tell a unique story. 
            From timeless classics to modern masterpieces, find the perfect piece that resonates with your style.
          </p>
          
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(category => (
              <button 
                key={category} 
                className="category-btn"
                onClick={() => {/* Add filter logic here */}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <span className="product-category">{product.category}</span>
              <h4>{product.name}</h4>
              <p className="product-description">{product.description}</p>
              <span className="product-price">{product.price}</span>
              <Link to={`/product/${product.id}`} className="btn-outline">
                Customize This Piece
              </Link>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="view-more">
          <button className="btn-gold">Load More Collections</button>
        </div>
      </div>
    </div>
  );
};

export default Collection;