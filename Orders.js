import React from "react";
import { Link } from "react-router-dom";
import "./Orders.css";

function Orders({ orders = [] }) {
  return (
    <div className="orders-page">
      <div className="orders-overlay">
        <div className="orders-header">
          <h1>📦 My Orders</h1>
          <Link to="/" className="back-home-btn">
            ← Back to Home
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders-box">
            <div className="empty-icon">📭</div>
            <h2>No Orders Yet</h2>
            <p>You have not placed any orders yet.</p>
            <Link to="/" className="shop-btn">
              Shop Books
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div className="order-card" key={index}>
                <div className="order-top">
                  <h3>Order #{index + 1}</h3>
                  <span className="status">Delivered</span>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div className="order-item" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="order-image"
                      />

                      <div className="order-info">
                        <h4>{item.title}</h4>
                        <p>{item.author}</p>
                        <span>
                          Qty: {item.quantity} × ₹{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  Total: ₹{order.total}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;