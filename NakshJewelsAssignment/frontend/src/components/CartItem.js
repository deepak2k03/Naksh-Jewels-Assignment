import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="clean-cart-item">
      {/* Big Image */}
      <img src={item.image} alt={item.name} className="clean-item-img" />

      {/* Info Block */}
      <div className="clean-item-info">
        <h4 className="clean-item-name">{item.name}</h4>
        <p className="clean-item-price">{formatPrice(item.price)}</p>
        
        {/* Simple Controls */}
        <div className="clean-controls">
          <div className="clean-qty">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>
          </div>
          
          <button className="clean-remove-btn" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      </div>

      {/* Total for this item (Desktop only usually) */}
      <div className="clean-item-total">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default CartItem;