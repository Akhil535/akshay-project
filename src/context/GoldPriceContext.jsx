import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const GoldPriceContext = createContext();

export const useGoldPrice = () => {
  const context = useContext(GoldPriceContext);
  if (!context) {
    throw new Error('useGoldPrice must be used within a GoldPriceProvider');
  }
  return context;
};

export const GoldPriceProvider = ({ children }) => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [goldPrice24K, setGoldPrice24K] = useState(null);
  const [goldPrice22K, setGoldPrice22K] = useState(null);
  const [goldPrice18K, setGoldPrice18K] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currency] = useState('AED');

  const FALLBACK_PRICES = {
    '24K': 250,
    '22K': 230,
    '18K': 190,
  };

  const simulateUAEGoldPrice = () => {
    const base24K = FALLBACK_PRICES['24K'];
    const randomVariation = (Math.random() - 0.5) * 8;
    const current24K = base24K + randomVariation;
    
    return {
      '24K': Number(current24K.toFixed(2)),
      '22K': Number((current24K * 0.916).toFixed(2)),
      '18K': Number((current24K * 0.750).toFixed(2))
    };
  };

  const fetchGoldPrice = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate UAE gold prices (replace with real API)
      const simulatedPrices = simulateUAEGoldPrice();
      setGoldPrice(simulatedPrices['24K']);
      setGoldPrice24K(simulatedPrices['24K']);
      setGoldPrice22K(simulatedPrices['22K']);
      setGoldPrice18K(simulatedPrices['18K']);
      
      setLastUpdated(new Date());
      
    } catch (err) {
      console.error('Gold API Error:', err);
      setError('Using standard UAE gold pricing');
      const fallbackPrices = simulateUAEGoldPrice();
      setGoldPrice(fallbackPrices['24K']);
      setGoldPrice24K(fallbackPrices['24K']);
      setGoldPrice22K(fallbackPrices['22K']);
      setGoldPrice18K(fallbackPrices['18K']);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldPrice();
    const interval = setInterval(fetchGoldPrice, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    goldPrice,
    goldPrice24K,
    goldPrice22K,
    goldPrice18K,
    loading,
    error,
    lastUpdated,
    currency,
    refreshGoldPrice: fetchGoldPrice
  };

  return (
    <GoldPriceContext.Provider value={value}>
      {children}
    </GoldPriceContext.Provider>
  );
};