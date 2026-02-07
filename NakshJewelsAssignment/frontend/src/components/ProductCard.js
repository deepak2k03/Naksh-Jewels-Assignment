import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock < 5 && product.stock > 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'disabled' : ''}`}>
      {/* Image Section */}
      <div className="card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
        
        {/* Badges */}
        {isLowStock && <span className="badge low-stock">Only {product.stock} Left</span>}
        {isOutOfStock && <span className="badge out-of-stock">Sold Out</span>}
        
        {/* Hover Overlay Action (Desktop) */}
        {!isOutOfStock && (
          <div className="card-overlay">
            <button className="quick-add-btn" onClick={handleAddToCart}>
              Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="card-info">
        <div className="info-header">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-price">{formatPrice(product.price)}</p>
        </div>
        
        <p className="card-description">
          {product.description?.length > 60 
            ? product.description.substring(0, 60) + "..." 
            : product.description}
        </p>

        {/* Mobile/Default Action Button */}
        <button 
          className="card-btn-main"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Unavailable' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;