import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';


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

  // Handle adding product to the cart
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      // Add product to the cart
      const response = await fetch("http://localhost:5001/cart", {
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

      if (!response.ok) {
        new Error("Failed to add product to the cart");
      }

      alert(`${product.name} has been added to your cart!`);

      // Navigate to the cart page after adding the product
      navigate("/");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Could not add to cart. Please try again.");
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-container">
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
            <button
              onClick={handleAddToCart}
              className="product-details-button add-to-cart"
            >
              <FiShoppingCart style={{ marginRight: '8px' }} />
              Add to Cart
            </button>
            <button onClick={() => navigate(-1)} className="product-details-button go-back">
              <FiArrowLeft style={{ marginRight: '8px' }} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
