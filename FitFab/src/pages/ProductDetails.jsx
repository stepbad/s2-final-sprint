import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching details:", error));
  }, [id]);

  const handleAddToCart = () => {
    alert(`${product.name} has been added to your cart!`);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="menswear-container">
      <div className="menswear-overlay">
        <div className="product-details">
          <img
            src={product.image}
            alt={product.name}
            className="product-details-image"
          />
          <h1 className="product-details-title">{product.name}</h1>
          <p className="product-details-description">Description: {product.description}</p>
          <p className="product-details-price">Price: ${product.price}</p>
          <p className="product-details-stock">In stock: {product.quantity}</p>
          <div className="product-details-buttons">
            <button onClick={handleAddToCart} className="product-details-button add-to-cart">
              Add to Cart
            </button>
            <button onClick={() => navigate(-1)} className="product-details-button go-back">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
