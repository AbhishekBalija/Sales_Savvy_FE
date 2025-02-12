/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  PackageOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const UserProfileDropdown = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:8080/api/users/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => navigate("/auth"));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ProfileMenuItem = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors group"
    >
      <Icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-purple-600 transition-colors" />
      {label}
    </button>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Trigger */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 p-1 pr-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow- cursor-pointer">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col items-start mr-1 cursor-pointer">
          <span className="text-lg font-[superwoobly] text-gray-800">
            {username}
          </span>
        </div>
        {isDropdownOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-slide-down">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-sm">
                {username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-[superwoobly] text-gray-800">
                  {username}
                </p>
              </div>
            </div>
          </div>

          {/* Dropdown Menu Items */}
          <div className="py-1">
            <ProfileMenuItem
              icon={User}
              label="My Profile"
              onClick={() => {
                navigate("/profile");
                setIsDropdownOpen(false);
              }}
            />
            <ProfileMenuItem
              icon={PackageOpen}
              label="Orders"
              onClick={() => {
                navigate("/orders");
                setIsDropdownOpen(false);
              }}
            />
          </div>

          {/* Logout Section */}
          <div className="border-t py-1">
            <ProfileMenuItem
              icon={LogOut}
              label="Logout"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default UserProfileDropdown;
