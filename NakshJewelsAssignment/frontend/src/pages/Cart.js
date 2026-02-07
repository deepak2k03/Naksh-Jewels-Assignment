import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import '../styles/Cart.css';

const Cart = ({ setCurrentPage }) => {
  const { cart, getCartTotal } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <h2 className="empty-title">Your Bag is Empty</h2>
        <button className="shop-now-btn" onClick={() => setCurrentPage('products')}>
          Shop The Collection
        </button>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <h1 className="cart-title">Shopping Bag ({cart.length})</h1>

      <div className="cart-grid">
        {/* Left: Items List */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right: Summary */}
        <div className="cart-summary-panel">
          <div className="summary-content">
            <h3>Order Summary</h3>
            
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            
            <div className="summary-line">
              <span>Shipping</span>
              <span className="green-text">Free</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>

            <button className="checkout-btn-black">
              CHECKOUT NOW
            </button>
            
            <p className="secure-text">🔒 Secure Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;