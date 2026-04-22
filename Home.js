import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({ books, cart, setCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [bannerIndex, setBannerIndex] = useState(0);

  const banners = [
    "/images/banner1.jpeg",
    "/images/banner2.jpeg",
    "/images/banner3.jpeg",
    "/images/banner4.jpeg",
    "/images/banner5.jpeg",
    "/images/banner6.jpeg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const filteredBooks = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (query === "") {
      return books.slice(0, 4);
    }

    return books.filter((book) => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();

      return title.includes(query) || author.includes(query);
    });
  }, [books, search]);

  const totalCartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const addToCart = (book) => {
    const existing = cart.find((item) => item.id === book.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const decreaseQty = (book) => {
    const existing = cart.find((item) => item.id === book.id);

    if (!existing) return;

    if (existing.quantity === 1) {
      setCart(cart.filter((item) => item.id !== book.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      setCart([]);
      localStorage.clear();
      sessionStorage.clear();

      alert("Logged out successfully");

      window.location.href = "/";
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-left">
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <h2 className="logo">📚 BookStore</h2>

          {menuOpen && (
            <div className="hamburger-menu">
              <Link to="/">🏠 Home</Link>
              <Link to="/cart">🛒 Cart ({totalCartCount})</Link>
              <Link to="/orders">📦 Orders</Link>
            </div>
          )}
        </div>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search books, authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-links">
          <Link to="/cart" className="nav-btn cart-btn">
            🛒 Cart ({totalCartCount})
          </Link>

          <Link to="/orders" className="nav-btn orders-btn">
            📦 Orders
          </Link>

          <button className="nav-btn logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </nav>

      <div className="welcome-banner">
        <h1>Welcome to BookStore 📚</h1>
        <p>Discover your next favorite book from our collection.</p>
      </div>

      <div className="banner-slider">
        <img
          src={banners[bannerIndex]}
          alt="banner"
          className="banner-image"
        />

        <div className="dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={bannerIndex === index ? "dot active-dot" : "dot"}
            />
          ))}
        </div>
      </div>

      <h2 className="section-title">All Books</h2>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            const cartItem = cart.find((item) => item.id === book.id);

            return (
              <div className="book-card" key={book.id}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="book-image"
                />

                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <h4>₹{book.price}</h4>

                {!cartItem ? (
                  <button
                    className="add-btn"
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="qty-box">
                    <button onClick={() => decreaseQty(book)}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => addToCart(book)}>+</button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="no-books">No books found</p>
        )}
      </div>

      <footer className="footer">
        <div className="footer-section">
          <h3>📚 BookStore</h3>
          <p>Your favorite place to discover books.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>support@bookstore.com</p>
          <p>+91 9876543210</p>
        </div>
      </footer>
    </div>
  );
}