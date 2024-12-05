const API_URL = 'http://localhost:5001';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export const addToCart = async (product) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  return response.json();
};

export const fetchCartItems = async () => {
  const response = await fetch(`${API_URL}/cart`);
  return response.json();
};

export const removeFromCart = async (id) => {
  await fetch(`${API_URL}/cart/${id}`, { method: 'DELETE' });
};
