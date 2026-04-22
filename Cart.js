// src/pages/Cart.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart({ cart = [], setCart }) {
  const navigate = useNavigate();

  const cartItems = Array.isArray(cart) ? cart : [];

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="top-bar">
          <div className="logo">📚 BookStore</div>
        </div>

        <div className="empty-cart-box">
          <h1 className="empty-title">My Cart</h1>

          <div className="empty-tabs">
            <span className="active-tab">BookStore</span>
            
          </div>

          <div className="empty-cart-icon">🛒</div>

          <h2>Your cart is empty!</h2>
          <p>Add books to your cart to see them here.</p>

          <Link to="/" className="shop-btn">
            Shop now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-bg">
      <div className="top-bar">
        <div className="logo">📚 BookStore</div>

        <Link to="/" className="back-link">
          ← Continue Shopping
        </Link>
      </div>

      <div className="page-container">
        <h1 className="page-title">🛒 Your Cart</h1>

        <div className="cart-box">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="cart-image"
              />

              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>{item.author}</p>
              </div>

              <div className="cart-price">
                ₹{item.price}
              </div>

              <div className="qty-box">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                🗑 Remove
              </button>
            </div>
          ))}
        </div>

        <div className="summary-box">
          <div className="summary-row">
            <span>Subtotal ({cartItems.length} items)</span>
            <span>₹{total}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-text">FREE</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;