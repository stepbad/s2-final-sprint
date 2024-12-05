import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>this will be the home page</h1>
      <div className="categories">
        <Link to="/menswear" className="category-link">
         
          <h2>Men's Wear</h2>
        </Link>
        <Link to="/womenswear" className="category-link">
          <h2>Women's Wear</h2>
        </Link>
        <Link to="/kidswear" className="category-link">
          <h2>Kids' Wear</h2>
        </Link>
      </div>
    </div>
  );
}

export default Home;