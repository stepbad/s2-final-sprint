import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Menswear = () => {
  const [products, setProducts] = useState([]);
  const [subcategory, setSubcategory] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      let url = 'http://localhost:5001/products?category=menswear';
      if (subcategory) {
        url += `&subcategory=${subcategory}`;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch products.');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Unable to load products. Please try again later.');
        setTimeout(() => setError(''), 3000); // Clear error message after 3 seconds
      }
    };

    fetchProducts();
  }, [subcategory]);

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const handleAddToCart = async (product) => {
    try {
      await fetch('http://localhost:5001/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        }),
      });
      setSuccessMessage(`${product.name} has been added to the cart!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Failed to add product to cart.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="menswear-container">
      <div className="menswear-overlay">
        <div className="menswear-content">
          <h1 className="menswear-title">Men's Products</h1>

          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

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
