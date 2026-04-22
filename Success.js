import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Success.css";

export default function Success() {
  const location = useLocation();

  useEffect(() => {
    const latestOrder = location.state?.order;

    if (latestOrder) {
      const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

      localStorage.setItem(
        "orders",
        JSON.stringify([latestOrder, ...oldOrders])
      );
    }
  }, [location.state]);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully</h1>
        <p>Your order has been placed.</p>

        <div className="success-buttons">
          <Link to="/orders" className="success-btn">
            View Orders
          </Link>

          <Link to="/" className="success-btn home-btn">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}