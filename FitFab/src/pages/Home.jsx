import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="categories">
        <Link to="/menswear" className="category-link">
        <img 
          src="/images/products/mens_leather_jacket.jpg"
          alt="Menswear"/> 
            <div class="image-title">Menswear</div>
       </Link>
        <Link to="/womenswear" className="category-link">
        <img 
          src="/images/products/womens_trenchcoat.jpg"
          alt="Womenswear"/> 
          <div class="image-title">Womenswear</div>
       </Link>
        <Link to="/kidswear" className="category-link">
        <img 
          src="/images/products/kids_fleece_jacket.jpg"
          alt="Kidswear"/> 
          <div class="image-title">Kidswear</div>
       </Link>
      </div>
    </div>
  );
}

export default Home;