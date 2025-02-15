import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import useCart from "../hooks/useCart";
import Footer from "../components/Footer";
import UserProfileDropdown from "../components/UserProfileDropdown";
import ShoppingCartButton from "../components/ShoppingCartButton";
import { useState, useEffect } from "react";
import usePayment from "../hooks/usePayment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();
  const {
    cartItems,
    overallTotalPrice,
    loading,
    error,
    updateCartItemQuantity,
    deleteCartItem,
  } = useCart();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Guest";
    setUsername(storedUsername);
  }, []);

  const { handleCheckout } = usePayment();

  const handleProceedToCheckout = () => {
    if (!cartItems.length) {
      toast.warn("Your cart is empty");
      return;
    }

    handleCheckout(cartItems, overallTotalPrice, username, navigate);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-purple-500"></span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-error max-w-2xl mx-auto mt-8">
        <span>{error}</span>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
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
                    className="h-12 w-12 object-cover mix-blend-screen"
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

      {/* Main Content */}
      <main className="flex-grow bg-purple-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="max-w-7xl mx-auto mt-4">
            <div className="flex items-center mb-8">
              <ShoppingCart className="h-8 w-8 text-purple-500 mr-3" />
              <h1 className="text-3xl font-medium text-black">
                Your Shopping Cart
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="flex-grow">
                {cartItems.length === 0 ? (
                  <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                    <ShoppingCart className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-black">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Add items to your cart to see them here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.product_id}
                        className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-[1.01]"
                      >
                        <div className="flex items-start space-x-6">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-[superwoobly] text-black">
                                  {item.name}
                                </h3>
                                <p className="text-gray-600 font-thin mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <button
                                onClick={() => deleteCartItem(item.product_id)}
                                className="btn btn-ghost btn-sm text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                              <span className="text-2xl font-bold text-purple-500">
                                ₹{item.price_per_unit}
                              </span>
                              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <button
                                  className="btn btn-sm btn-ghost text-purple-500"
                                  onClick={() =>
                                    updateCartItemQuantity(
                                      item.product_id,
                                      Math.max(item.quantity - 1, 0)
                                    )
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-12 text-center font-semibold text-black">
                                  {item.quantity}
                                </span>
                                <button
                                  className="btn btn-sm btn-ghost text-purple-500"
                                  onClick={() =>
                                    updateCartItemQuantity(
                                      item.product_id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-[380px]">
                <div className="bg-white shadow-lg rounded-lg p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-black">
                        ₹{overallTotalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-black">Free</span>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    <div className="flex justify-between text-xl">
                      <span className="font-bold text-black">Total</span>
                      <span className="font-bold text-black">
                        ₹{overallTotalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={handleProceedToCheckout}
                      className="w-full bg-purple-500 text-white py-4 rounded-lg font-semibold text-lg mt-6 hover:bg-purple-600 transition-colors"
                    >
                      Proceed to Checkout
                    </button>

                    <p className="text-center text-gray-600 text-sm mt-4">
                      Free shipping on all orders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
