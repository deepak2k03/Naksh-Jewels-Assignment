import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

const Header = ({ currentPage, setCurrentPage }) => {
  const { getCartCount } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => setCurrentPage('products')} style={{cursor: 'pointer'}}>
          <h1>Naksh Jewels</h1>
          <p className="tagline">Timeless Elegance</p>
        </div>

        <nav className="nav">
          <button
            className={`nav-button ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => setCurrentPage('products')}
          >
            COLLECTION
          </button>
          <button
            className={`nav-button cart-button ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            BAG
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;