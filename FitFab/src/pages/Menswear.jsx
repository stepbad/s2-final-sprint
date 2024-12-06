import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Menswear = () => {
  const [products, setProducts] = useState([]);
  const [subcategory, setSubcategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let url = 'http://localhost:5001/products?category=menswear';
    if (subcategory) {
      url += `&subcategory=${subcategory}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, [subcategory]);

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const handleViewDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="menswear-container">
      <div className="menswear-overlay">
        <div className="menswear-content">
          <h1 className="menswear-title">Men's Products</h1>
          
          <div className="menswear-filter">
            <label htmlFor="subcategory-filter">Filter by:</label>
            <select 
              id="subcategory-filter" 
              value={subcategory} 
              onChange={handleSubcategoryChange}
            >
              <option value="">All</option>
              <option value="outerwear">Outerwear</option>
              <option value="tops">Tops</option>
              <option value="pants">Pants</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="button-group">
                  <button className="menswear-button" onClick={() => handleViewDetails(product.id)}>View Details</button>
                  <button className="menswear-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menswear;
