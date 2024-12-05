import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Menswear = () => {
  const [products, setProducts] = useState([]);
  const [subcategory, setSubcategory] = useState(''); // '' means "all"
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
    <div>
      <h1>Men's Products</h1>
      <div>
        <label htmlFor="subcategory-filter">Filter by: </label>
        <select id="subcategory-filter" value={subcategory} onChange={handleSubcategoryChange}>
          <option value="">All</option>
          <option value="outerwear">Outerwear</option>
          <option value="tops">Tops</option>
          <option value="pants">Pants</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', width: '200px', padding: '10px' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto' }} 
            />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => handleViewDetails(product.id)}>View Details</button>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menswear;
