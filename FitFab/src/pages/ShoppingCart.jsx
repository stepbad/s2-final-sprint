import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./../index.css";

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  const onDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/cart/${id}`, { method: "DELETE" });
      setCart(cart.filter((item) => item.id !== id));
      setMessage("Item removed successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to remove the item.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const updateItem = async (id, updates) => {
    try {
      const updatedItem = cart.find((item) => item.id === id);
      await fetch(`http://localhost:5001/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      setCart(
        cart.map((item) => (item.id === id ? { ...updatedItem, ...updates } : item))
      );
      setMessage("Item updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Failed to update the item.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    const tax = subtotal * 0.15; // 15% HST
    return {
      subtotal,
      tax,
      total: subtotal + tax,
    };
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="product-details-container">
      <div className="product-details-overlay">
        <div className="product-details-content">
          <div className="cart">
            <h1 className="cart-h1">Your Cart</h1>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
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
            {cart.length > 0 && (
              <div className="cart-summary">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax (15% HST): ${tax.toFixed(2)}</p>
                <p>Total: ${total.toFixed(2)}</p>
                <Link to="/checkout" className="proceed-to-checkout-link">
                  Proceed to Checkout
                </Link>
              </div>
            )}
            {cart.length === 0 && <p>Your cart is empty.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
