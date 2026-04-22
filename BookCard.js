import React, { useEffect, useState } from "react";

function BookCard({ book }) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === book.id);
    if (existing) {
      setQty(existing.qty);
    }
  }, [book.id]);

  const updateCart = (newQty) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter((item) => item.id !== book.id);

    if (newQty > 0) {
      cart.push({ ...book, qty: newQty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQty(newQty);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "18px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <img
        src={book.image}
        alt={book.title}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "12px"
        }}
      />

      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <h2>₹{book.price}</h2>

      {qty === 0 ? (
        <button
          onClick={() => updateCart(1)}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            background: "#3b82f6",
            color: "white",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f3f4f6",
            borderRadius: "10px",
            padding: "8px"
          }}
        >
          <button
            onClick={() => updateCart(qty - 1)}
            style={{
              width: "40px",
              height: "40px",
              border: "none",
              borderRadius: "8px",
              background: "#ef4444",
              color: "white",
              fontSize: "20px"
            }}
          >
            -
          </button>

          <span style={{ fontSize: "20px", fontWeight: "bold" }}>{qty}</span>

          <button
            onClick={() => updateCart(qty + 1)}
            style={{
              width: "40px",
              height: "40px",
              border: "none",
              borderRadius: "8px",
              background: "#22c55e",
              color: "white",
              fontSize: "20px"
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default BookCard;