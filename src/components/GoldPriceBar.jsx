import React from 'react';
import { useGoldPrice } from '../context/GoldPriceContext';

const GoldPriceBar = () => {
  const { 
    goldPrice24K, 
    goldPrice22K, 
    goldPrice18K, 
    loading, 
    error, 
    lastUpdated, 
    currency,
    refreshGoldPrice 
  } = useGoldPrice();

  const formatTime = (date) => {
    return date ? date.toLocaleTimeString('en-AE', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Dubai'
    }) : '';
  };

  if (loading) {
    return (
      <div className="gold-price-bar loading">
        <div className="container">
          <span>🔄 Loading UAE gold prices from Dubai market...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="gold-price-bar">
      <div className="container">
        <div className="gold-price-content">
          <div className="gold-price-info">
            <span className="gold-icon">🇦🇪</span>
            <span className="price-label">UAE Gold Today:</span>
            
            <div className="gold-karat-prices">
              <span className="karat-price">
                <strong>24K:</strong> {currency} {goldPrice24K?.toFixed(2)}/g
              </span>
              <span className="karat-price">
                <strong>22K:</strong> {currency} {goldPrice22K?.toFixed(2)}/g
              </span>
              <span className="karat-price">
                <strong>18K:</strong> {currency} {goldPrice18K?.toFixed(2)}/g
              </span>
            </div>

            {lastUpdated && (
              <span className="last-updated">
                Dubai Market - {formatTime(lastUpdated)}
              </span>
            )}
          </div>
          
          <div className="gold-price-actions">
            {error && (
              <div className="gold-price-error">
                <span>⚠️ {error}</span>
              </div>
            )}

            <button 
              className="refresh-btn"
              onClick={refreshGoldPrice}
              title="Refresh UAE gold prices"
            >
              🔄 Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldPriceBar;