import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  ChevronRight,
  LogOut,
} from "lucide-react";
import useAuth from "../hooks/useAuth"; // Adjust the path if needed

const CustomerHome = () => {
  const { handleLogout } = useAuth();

  // Retrieve the username from localStorage (or default to "Guest")
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Guest";
    setUsername(storedUsername);
  }, []);

  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 299.99,
      rating: 4.5,
      image: "https://m.media-amazon.com/images/I/71RJCexaxiL._SX679_.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      rating: 4.8,
      image:
        "https://www.gonoise.com/cdn/shop/files/1_ecb6bab3-7552-4d31-a0bb-833b19044577.png?v=1716538343",
    },
    {
      id: 3,
      name: "Wireless Speaker",
      price: 149.99,
      rating: 4.3,
      image: "https://m.media-amazon.com/images/I/710W6ATCrKL._SX679_.jpg",
    },
    {
      id: 4,
      name: "Digital Camera",
      price: 599.99,
      rating: 4.7,
      image:
        "https://futureforward.in/images/thumbs/008/0082147_sony-alpha-a7-iii-mirrorless-digital-camera-with-28-70mm-lens_600.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-purple-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Right: Icons, Profile, and Logout */}
          <div className="flex items-center space-x-4">
            {/* Heart Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-6 h-6 text-gray-600" />
            </button>

            {/* Shopping Cart Icon */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile Display */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-800 font-medium">{username}</span>
            </div>

            {/* Logout Button with Icon */}
            <button
              onClick={handleLogout}
              className="p-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Your Shopping Paradise
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8">
              Discover amazing deals on premium products curated just for you
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors">
              Explore Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Featured Products
            </h2>
            <button className="flex items-center text-purple-600 hover:text-purple-700">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">
                      ${product.price}
                    </span>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Electronics", "Fashion", "Home & Living", "Accessories"].map(
              (category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-purple-50 rounded-lg p-6 text-center cursor-pointer hover:bg-purple-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">Shop Now</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerHome;
