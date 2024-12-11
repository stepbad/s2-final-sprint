import React, { useEffect, useState } from 'react';
import { fetchCartItems, removeFromCart } from '../services/api'; 

const Checkout = ({ isLoggedIn }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const items = await fetchCartItems();
        setCartItems(items);

        const subtotalValue = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        const taxValue = subtotalValue * 0.15; // 15% tax
        setSubtotal(subtotalValue);
        setTax(taxValue);
        setTotal(subtotalValue + taxValue);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      await removeFromCart(id);
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);

      const subtotalValue = updatedCart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
      const taxValue = subtotalValue * 0.15;
      setSubtotal(subtotalValue);
      setTax(taxValue);
      setTotal(subtotalValue + taxValue);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleSubmitOrder = async () => {
    if (!isLoggedIn) {
      alert('Please log in to submit your order.');
      return;
    }
  
    try {
      await fetch('http://localhost:5001/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });
  
      for (const item of cartItems) {
        const productResponse = await fetch(`http://localhost:5001/products/${item.productId}`);
        const product = await productResponse.json();
  
        await fetch(`http://localhost:5001/products/${item.productId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quantity: product.quantity - (item.quantity || 1),
          }),
        });
      }
  
      for (const item of cartItems) {
        await fetch(`http://localhost:5001/cart/${item.id}`, {
          method: 'DELETE',
        });
      }
  
      alert('Order submitted successfully!');
      setCartItems([]);
      setSubtotal(0);
      setTax(0);
      setTotal(0);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    }
  };
  
  

  return (
    <div className="home-container">
      <div className="menswear-overlay">
        <div className="checkout-content">
          <h1>Please log in to submit order</h1>
         <div className="cart-items">
           {cartItems.length > 0 ? (
           cartItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <h2>{item.name}</h2>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity || 1}</p>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="checkout-summary">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax (15% HST): ${tax.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
          <button onClick={handleSubmitOrder} disabled={!isLoggedIn}>
            Submit Order
          </button>
        </div>
      )}
        </div>
      </div>
    </div>
    
  );
};

export default Checkout;