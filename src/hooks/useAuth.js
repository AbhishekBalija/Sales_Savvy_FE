import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const useAuth = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    role: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const validateForm = (isSignUp = false) => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }

      if (!formData.role) {
        newErrors.role = "Please select a role";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm(true)) {
      toast.error("Please check the form for errors", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Registration successful!", {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
        });
        
        // Reset form and switch to sign in after a short delay
        setTimeout(() => {
          setIsActive(false);
          setFormData({
            username: "",
            email: "",
            password: "",
            role: "",
          });
        }, 3000);
      } else {
        const errorMessage = data.Error || "Registration failed";
        toast.error(errorMessage, {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
        });

        if (errorMessage.includes("Username")) {
          setErrors((prev) => ({ ...prev, username: errorMessage }));
        } else if (errorMessage.includes("Email")) {
          setErrors((prev) => ({ ...prev, email: errorMessage }));
        } else if (errorMessage.includes("Password")) {
          setErrors((prev) => ({ ...prev, password: errorMessage }));
        }
      }
    } catch {
      toast.error("Please check your internet connection and try again", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (!validateForm(false)) {
      toast.error("Please check the form for errors", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Invalid Credentials");
      }
  
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
  
      const toastId = toast.success("Login successful!", {
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
      });
  
      // Navigate after toast closes
      setTimeout(() => {
        toast.dismiss(toastId);
        if (data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }, 2000);
      
    } catch (error) {
      toast.error(error.message || "Please check your internet connection and try again", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  const handleLogout = async () => {
    try {
      const token = getCookie("jwt");
      if (!token) {
        toast.error("Token not found. Please log in again.", {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
        });
        navigate("/");
        return;
      }
  
      const response = await fetch("http://localhost:8080/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.Error || "Logout failed");
      }
  
      localStorage.removeItem("username");
      localStorage.removeItem("role");
  
      const toastId = toast.success(data.message || "Logged out successfully", {
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
      });
  
      // Navigate after toast closes
      setTimeout(() => {
        toast.dismiss(toastId);
        navigate("/");
      }, 2000);
      
    } catch (error) {
      toast.error(error.message || "An error occurred during logout", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return {
    isActive,
    setIsActive,
    formData,
    errors,
    handleInput,
    handleSignUp,
    handleSignIn,
    handleLogout,
  };
};

export default useAuth;