import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { books } from "./data/books";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Success from "./pages/Success";

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            books={books}
            cart={cart}
            setCart={setCart}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            setCart={setCart}
          />
        }
      />

      <Route
        path="/checkout"
        element={
          <Checkout
            cart={cart}
            setCart={setCart}
            orders={orders}
            setOrders={setOrders}
          />
        }
      />

      <Route
        path="/orders"
        element={<Orders orders={orders} />}
      />

      <Route
        path="/success"
        element={<Success />}
      />
    </Routes>
  );
}

export default App;