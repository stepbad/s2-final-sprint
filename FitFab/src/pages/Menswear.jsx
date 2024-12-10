import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductDetails from './ProductDetails';

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
    navigate(`/ProductDetails/${id}`);
  };

  const handleAddToCart = async (product) => {
    try {
      // Post only the selected product to the cart endpoint
      await fetch("http://localhost:5001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      });
  
      // Navigate to the cart page after adding the product
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
              <motion.div 
                className="product-card" 
                key={product.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="button-group">
                  <button 
                    className="menswear-button" 
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                   <FiEye style={{ marginRight: '8px' }} />
                    View Details
                  </button>
                  <button 
                    className="menswear-button" 
                    onClick={() => handleAddToCart(product)}
                  >
                    <FiShoppingCart style={{ marginRight: '8px' }} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menswear;
