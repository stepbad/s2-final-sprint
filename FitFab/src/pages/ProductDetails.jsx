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
    <div className="product-details" style={{ padding: "20px" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "200px", height: "150px", marginBottom: "10px" }}
      />
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Subcategory: {product.subcategory}</p>
      <p>Price: ${product.price}</p>
      <p>In stock: {product.quantity}</p>
      <button onClick={handleAddToCart} style={{ marginRight: "10px" }}>
        Add to Cart
      </button>
      <button onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

export default ProductDetails;
