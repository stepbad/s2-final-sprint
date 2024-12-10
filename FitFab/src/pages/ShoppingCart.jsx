import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import "./../index.css";

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  // Function to delete an item from the cart
  const onDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/cart/${id}`, {
        method: "DELETE",
      });
      setCart(cart.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Update the size, color, or quantity
  const updateItem = (id, updates) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  useEffect(() => {
    fetch("http://localhost:5001/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  return (
    <div className="product-details-container">
      <div className="product-details-overlay">
        <div className="product-details-content">
          <div className="cart">
            <h1 className="cart-h1">Your Cart</h1>
            {message && <div className="success-message">{message}</div>}
            <div className="cart-grid">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                  <div className="cart-labels">
                    <label>
                      Size:
                      <select
                        value={item.size || "M"}
                        onChange={(e) =>
                          updateItem(item.id, { size: e.target.value })
                        }
                      >
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </label>
                    <label>
                      Color:
                      <select
                        value={item.color || "Black"}
                        onChange={(e) =>
                          updateItem(item.id, { color: e.target.value })
                        }
                      >
                        {[
                          "White",
                          "Grey",
                          "Black",
                          "Brown",
                          "Purple",
                          "Blue",
                          "Green",
                          "Yellow",
                          "Orange",
                          "Red",
                          "Pink",
                        ].map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div>
                      Quantity:
                      <button
                        onClick={() =>
                          updateItem(item.id, {
                            quantity: (item.quantity || 1) - 1,
                          })
                        }
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        onClick={() =>
                          updateItem(item.id, {
                            quantity: (item.quantity || 1) + 1,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                    <p>Price: ${item.price}</p>
                    <h2>
                      {item.name}
                      <FaTimes
                        className="delete-icon"
                        onClick={() => onDelete(item.id)}
                      />
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
