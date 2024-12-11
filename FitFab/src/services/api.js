const API_URL = 'http://localhost:5001';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (category, subcategory = '') => {
  try {
    let url = `${API_URL}/products?category=${category}`;
    if (subcategory) {
      url += `&subcategory=${subcategory}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const addToCart = async (product) => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to add product to cart.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

export const fetchCartItems = async () => {
  try {
    const response = await fetch(`${API_URL}/cart`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart items.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const updateCartItem = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/cart/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update cart item.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cart/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to remove item from cart.');
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};
