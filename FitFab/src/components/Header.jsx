// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Menswear">Men's Wear</Link>
        <Link to="/Womenswear">Women's Wear</Link>
        <Link to="/Kidswear">Kids' Wear</Link>
        <Link to="/ShoppingCart">Cart</Link>
        <Link to="/Login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
