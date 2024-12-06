import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-area">
        <Link to="/">
          <img 
            src="/images/logo.jpg" 
            alt="Brand Logo" 
            className="brand-logo"
          />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menswear">Menswear</Link>
        <Link to="/womenswear">Womenswear</Link>
        <Link to="/kidswear">Kidswear</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;

