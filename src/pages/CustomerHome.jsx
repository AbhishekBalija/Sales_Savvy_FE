import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import Navbar from "../components/NavBar";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

const CATEGORIES = [
  "Shirts",
  "Pants",
  "Mobiles",
  "Mobile Accessories",
  "Accessories",
];

const CustomerHome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest");
  const [selectedCategory, setSelectedCategory] = useState("Shirts");
  const { products, loading, error } = useProducts(selectedCategory);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Guest";
    setUsername(storedUsername);
  }, []);

  // Handle unauthorized access (401)
  useEffect(() => {
    if (error && error.includes("401")) {
      console.error("Unauthorized access detected. Redirecting to login...");
      navigate("/auth");
    }
  }, [error, navigate]);

  // Show loading state while initially loading
  if (loading && !products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Show error state (excluding 401 errors, as they are handled above)
  if (error && !loading && !error.includes("401")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-center mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-100">
      <Navbar
        username={username}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ProductList
        products={products}
        loading={loading}
        selectedCategory={selectedCategory}
      />
      <Footer />
    </div>
  );
};

export default CustomerHome;
