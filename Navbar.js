import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(total);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cart");
    alert("Logged out successfully");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav
        style={{
          background: "#111827",
          padding: "14px 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "28px",
              cursor: "pointer"
            }}
          >
            ☰
          </button>

          <h2 style={{ margin: 0 }}>📚 BookStore</h2>
        </div>

        <input
          type="text"
          placeholder="Search books, authors..."
          style={{
            width: "320px",
            padding: "12px 20px",
            borderRadius: "30px",
            border: "none"
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
            🛒 Cart ({cartCount})
          </Link>
          <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>Orders</Link>

          <button
            onClick={handleLogout}
            style={{
              background: "#ef4444",
              border: "none",
              color: "white",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {showMenu && (
        <div
          style={{
            background: "white",
            width: "220px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            position: "absolute",
            top: "70px",
            left: "20px",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            zIndex: 1001
          }}
        >
          <Link to="/" onClick={() => setShowMenu(false)}>🏠 Home</Link>
          <Link to="/cart" onClick={() => setShowMenu(false)}>🛒 Cart</Link>
          <Link to="/orders" onClick={() => setShowMenu(false)}>📦 Orders</Link>
        </div>
      )}
    </>
  );
}

export default Navbar;