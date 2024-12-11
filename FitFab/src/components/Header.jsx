import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ isLoggedIn, onLogout, user }) => {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      <div className="logo-area" onClick={() => navigate('/')}>
        <img
          src="/images/logo.jpg"
          alt="FitFab Logo"
          className="brand-logo"
        />
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menswear">Menswear</Link>
        <Link to="/womenswear">Womenswear</Link>
        <Link to="/kidswear">Kidswear</Link>
        <Link to="/cart">Cart</Link>
        {isLoggedIn && <Link to="/checkout">Checkout</Link>}
      </nav>
      <div className="user-info">
        {isLoggedIn && user ? (
          <p className="user-greeting">Welcome, {user.email || "User"}!</p>
        ) : null}
        <div className="user-icon">
          {isLoggedIn ? (
            <FaSignOutAlt
              onClick={onLogout}
              title="Logout"
              className="logout-icon"
            />
          ) : (
            <FaUserCircle
              onClick={() => navigate('/login')}
              title="Login/Signup"
              className="login-icon"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
