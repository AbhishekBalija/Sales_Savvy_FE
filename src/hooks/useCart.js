import { useState, useEffect } from 'react';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [overallTotalPrice, setOverallTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch cart items from the backend API
  const fetchCartItems = async () => {
    try {
      const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
      const response = await fetch('http://localhost:8080/api/cart/items', {
        method: 'GET',
        credentials: 'include', // Include credentials (cookies, headers)
        headers: {
          'Content-Type': 'application/json',
        },
        params: { username }, // Add query parameters if needed
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCartItems(data.cart.products || []);
      setOverallTotalPrice(data.cart.overall_total_price || 0);
      setLoading(false);
    } catch  {
      setError('Failed to fetch cart items');
      setLoading(false);
    }
  };

    // Get the cart item count
    const getCartItemCount = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:8080/api/cart/items/count?username=${username}`, {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies, headers)
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart item count');
        }
        const data = await response.json();
        return data.count || 0;
      } catch (err) {
        console.error('Error fetching cart item count:', err);
        return 0;
      }
    };

    // Add a cart item
    const addCartItem = async (productId, quantity = 1) => {
      try {
        const username = localStorage.getItem('username');
        const response = await fetch('http://localhost:8080/api/cart/add', {
          method: 'POST',
          credentials: 'include', // Include credentials
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, productId, quantity }), // Ensure the payload matches the expected format
        });
        if (!response.ok) {
          throw new Error('Failed to add cart item');
        }
        fetchCartItems(); // Refresh the cart after adding
      } catch  {
        setError('Failed to add cart item');
      }
    };

  // Update the quantity of a cart item
  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch('http://localhost:8080/api/cart/update', {
        method: 'PUT',
        credentials: 'include', // Include credentials
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }

      fetchCartItems(); // Refresh the cart after updating
    } catch  {
      setError('Failed to update cart item');
    }
  };

  // Delete a cart item
  const deleteCartItem = async (productId) => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch('http://localhost:8080/api/cart/delete', {
        method: 'DELETE',
        credentials: 'include', // Include credentials
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }

      fetchCartItems(); // Refresh the cart after deletion
    } catch  {
      setError('Failed to delete cart item');
    }
  };

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItems,
    addCartItem,
    getCartItemCount,
    overallTotalPrice,
    loading,
    error,
    updateCartItemQuantity,
    deleteCartItem,
    refreshCart: fetchCartItems, // Expose a method to manually refresh the cart
  };
};

export default useCart;