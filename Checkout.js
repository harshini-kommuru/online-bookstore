import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({ cart = [], setCart, setOrders }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill all details");
      return;
    }

    const newOrder = {
      customer: form,
      items: cart,
      total,
    };

    setOrders((prev) => [...prev, newOrder]);
    setCart([]);

    navigate("/success");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-overlay">
        <div className="checkout-container">
          <div className="checkout-left">
            <h1>🧾 Checkout</h1>
            <p>Enter delivery details to place your order.</p>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="checkout-right">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div className="summary-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
              </div>
            ))}

            <div className="summary-total">
              Total: ₹{total}
            </div>

            <button className="place-order-btn" onClick={handleOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;