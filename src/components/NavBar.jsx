/* eslint-disable react/prop-types */
import { useState } from "react";
import { Search, Heart } from "lucide-react";
import UserProfileDropdown from "./UserProfileDropdown";
import ShoppingCartButton from "./ShoppingCartButton";

const Navbar = ({
  username,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Top Navigation Bar */}
        <div className="py-3 flex items-center justify-between">
          {/* Left: Brand Logo and Search */}
          <div className="flex items-center space-x-6">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 ">
              <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
                <img
                  src="/SalesSavvyLogo2.png"
                  alt="Sales Savvy Logo"
                  className="h-[13] w-[13] object-cover mix-blend-screen"
                />
              </div>
              <span className="font-[rostey] text-2xl">Sales Savvy</span>
            </div>

            {/* Search Bar */}
            <div className="relative ml-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-72 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right: Notification, Help, Cart, Profile */}
          <div className="flex items-center space-x-5">
            {/* User Profile Dropdown */}
            <UserProfileDropdown username={username} />

            {/* Help Button */}
            <button className="text-gray-600 hover:text-purple-600 transition-colors">
              <Heart className="h-6 w-6" />
            </button>

            {/* Cart Button */}
            <ShoppingCartButton />
          </div>
        </div>

        <nav className="py-2 border-t bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="relative flex items-center space-x-6 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`
            relative 
            pb-3 
            text-sm 
            font-medium 
            whitespace-nowrap 
            transition-colors 
            duration-300 
            group
            ${
              selectedCategory === category
                ? "text-purple-600"
                : "text-gray-600 hover:text-purple-700"
            }
          `}
                >
                  {category}

                  {/* Animated Underline */}
                  <span
                    className={`
              absolute 
              bottom-0 
              left-0 
              right-0 
              h-0.5 
              transition-all 
              duration-300 
              ${
                selectedCategory === category
                  ? "bg-purple-600 scale-x-100"
                  : "bg-purple-600 scale-x-0 group-hover:scale-x-100"
              }
            `}
                  />
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
