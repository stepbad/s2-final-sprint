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
  const [user, setUser] = useState(null); // State to track logged-in user

  // Function to handle user login
  const handleLogin = (userData) => {
    setUser(userData); // Save user data upon login
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null); // Clear user state on logout
  };

  const isLoggedIn = !!user; // Boolean flag indicating login status

  return (
    <>
      {/* Header receives login status and logout handler */}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menswear" element={<Menswear />} />
        <Route path="/womenswear" element={<Womenswear />} />
        <Route path="/kidswear" element={<Kidswear />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Shopping Cart: Accessible to all users */}
        <Route path="/cart" element={<ShoppingCart />} />

        {/* Checkout: Protected Route */}
        <Route
          path="/checkout"
          element={<Checkout isLoggedIn={isLoggedIn} />}
        />

        {/* Login Page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Redirect Unknown Routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
