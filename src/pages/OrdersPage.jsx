import Orders from "../components/Orders";
import UserProfileDropdown from "../components/UserProfileDropdown";
import ShoppingCartButton from "../components/ShoppingCartButton";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Guest";
    setUsername(storedUsername);
  }, []);
  return (
    <div className="container mx-auto p-6">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Navigation Bar */}
          <div className="py-3 flex items-center justify-between">
            {/* Left: Brand Logo and Search */}
            <div className="flex items-center space-x-6">
              {/* Brand Logo */}
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
                  <img
                    src="/SalesSavvyLogo2.png"
                    alt="Sales Savvy Logo"
                    className="h-[13] w-[13] object-cover mix-blend-screen"
                  />
                </div>
                <span className="font-[rostey] text-2xl">Sales Savvy</span>
              </div>
            </div>

            {/* Right: Notification, Help, Cart, Profile */}
            <div className="flex items-center space-x-5">
              <UserProfileDropdown username={username} />
              <ShoppingCartButton />
            </div>
          </div>
        </div>
      </header>
      <Orders />
    </div>
  );
};

export default OrdersPage;
