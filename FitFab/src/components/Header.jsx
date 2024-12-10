import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="header-container">
      <motion.div
        className="logo-area"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <Link to="/">
          <img
            src="/images/logo.jpg"
            alt="Brand Logo"
            className="brand-logo"
          />
        </Link>
      </motion.div>
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
