import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./../App.css";

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  // Function to delete an item from the cart
  const onDelete = async (id) => {
    try {
      // Delete from the server
      await fetch(`http://localhost:5001/cart/${id}`, {
        method: "DELETE",
      });

      // Update the UI by removing the deleted item
      setCart(cart.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Function to update the cart (API + UI)
  const updateCart = async (newCartItem) => {
    try {
      const res = await fetch("http://localhost:5001/cart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newCartItem),
      });

      const addedItem = await res.json();

      // Update the UI with the new item
      setCart([...cart, addedItem]);
      setMessage("Item added to the cart successfully!");

      // Clear the message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Fetch cart data from the API
  useEffect(() => {
    fetch("http://localhost:5001/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {message && <div className="success-message">{message}</div>}
      <div className="cart-grid">
        {cart.map((cartItem) => (
          <div key={cartItem.id} className="cart-item">
            <img
              src={cartItem.image}
              alt={cartItem.name}
              className="product-image"
            /> \
            <h2>{cartItem.name}
              <FaTimes
                style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
                onClick={() => onDelete(cartItem.id)}
              />
            </h2>
            <p> Price:
              {cartItem.price}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingCart;


