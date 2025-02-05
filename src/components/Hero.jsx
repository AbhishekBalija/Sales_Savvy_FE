import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import "../index.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 h-screen flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900"
          >
            Discover Your Style
            <span className="block text-purple-600">Shop with Confidence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto lg:mx-0"
          >
            Explore our curated collection of premium products, designed to
            elevate your lifestyle and bring joy to your everyday moments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/auth")}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-purple-600 rounded-full overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-purple-700"
            >
              <span className="mr-2">
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </span>
              Get Started
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </motion.div>
        </div>

        {/* Right Content - Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex-1 relative"
        >
          <div className="relative w-full h-96">
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute top-20 right-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
