import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingBag } from "lucide-react";

const ShoppingCartButton = () => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const username = localStorage.getItem("username"); // Read from localStorage

  useEffect(() => {
    if (!username) return; // Stop if no username is found

    const fetchCartItemCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/cart/items/count?username=${username}`,
          {
            withCredentials: true, // Send JWT token in cookies
          }
        );
        setCartItemCount(response.data); // Update cart count
      } catch (error) {
        console.error("Error fetching cart item count:", error);
        setCartItemCount(0);
      }
    };

    fetchCartItemCount();
  }, [username]); // Runs when username changes

  return (
    <button
      className="relative text-gray-600 hover:text-purple-600 transition-colors"
      onClick={() => navigate("/cart")}
    >
      <ShoppingBag className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cartItemCount}
      </span>
    </button>
  );
};

export default ShoppingCartButton;
