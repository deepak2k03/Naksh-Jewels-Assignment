import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import API_URL from '../config';
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. New State for active category
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        // Fallback for direct array response (if API structure varies)
        setProducts(Array.isArray(data) ? data : []); 
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // 2. The Logic: Filter products based on the name
  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'All') return true;
    
    // Logic: If category is "Rings", look for "Ring" in the product name
    const keyword = activeFilter.slice(0, -1); // Removes the 's' (Rings -> Ring)
    return product.name.toLowerCase().includes(keyword.toLowerCase());
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader-ring"></div>
        <p className="loading-text">Curating Collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={fetchProducts}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* Editorial Header */}
      <header className="collection-hero">
        <span className="overline">New Arrivals</span>
        <h2 className="hero-title">The Diamond Edit</h2>
        <p className="hero-desc">
          Handcrafted brilliance designed for the modern era. 
          Explore our latest curation of ethically sourced gemstones.
        </p>
      </header>

      {/* 3. Functional Filter Bar */}
      <div className="filter-bar">
        <span className="filter-count">{filteredProducts.length} Products</span>
        
        <div className="filter-options">
          {['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((category) => (
            <button 
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Render Filtered Products */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#888'}}>
            <p>No products found in this category.</p>
            <button 
              style={{marginTop:'1rem', background:'none', border:'1px solid #333', padding:'8px 16px', cursor:'pointer'}}
              onClick={() => setActiveFilter('All')}
            >
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;