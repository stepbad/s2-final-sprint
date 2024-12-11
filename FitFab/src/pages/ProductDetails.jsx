import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5001/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product details.");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Could not load product details. Please try again later.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
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
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to the cart.");
      }

      alert(`${product.name} (x${quantity}) has been added to your cart!`);
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Could not add to cart. Please try again.");
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

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
          <p className="product-details-description">
            Description: {product.description}
          </p>
          <p className="product-details-price">Price: ${product.price.toFixed(2)}</p>
          <p className="product-details-stock">In stock: {product.quantity}</p>

          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              max={product.quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="product-details-buttons">
            <button
              onClick={handleAddToCart}
              className="product-details-button add-to-cart"
            >
              <FiShoppingCart style={{ marginRight: "8px" }} />
              Add to Cart
            </button>
            <button onClick={() => navigate(-1)} className="product-details-button go-back">
              <FiArrowLeft style={{ marginRight: "8px" }} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
