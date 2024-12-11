import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menswear from "./pages/Menswear";
import Womenswear from "./pages/Womenswear";
import Kidswear from "./pages/Kidswear";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null); 
  };

  const isLoggedIn = !!user; 

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menswear" element={<Menswear />} />
        <Route path="/womenswear" element={<Womenswear />} />
        <Route path="/kidswear" element={<Kidswear />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<ShoppingCart />} />

        <Route
          path="/checkout"
          element={<Checkout isLoggedIn={isLoggedIn} />}
        />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
