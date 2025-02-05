import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    role: "CUSTOMER"
  });
  
  const [errors, setErrors] = useState({});
  const [toastState, setToastState] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let timer = null;
    if (toastState.isOpen) {
      timer = setTimeout(() => {
        setToastState((prev) => ({ ...prev, isOpen: false }));
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [toastState.isOpen]);

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
      setToastState({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Please check the form for errors",
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
        setToastState({
          isOpen: true,
          type: "success",
          title: "Success",
          message: data.message || "Registration successful!",
        });
        setIsActive(false);
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "CUSTOMER",
        });
      } else {
        const errorMessage = data.Error || "Registration failed";
        setToastState({
          isOpen: true,
          type: "error",
          title: "Registration Failed",
          message: errorMessage,
        });

        if (errorMessage.includes("Username")) {
          setErrors((prev) => ({ ...prev, username: errorMessage }));
        } else if (errorMessage.includes("Email")) {
          setErrors((prev) => ({ ...prev, email: errorMessage }));
        } else if (errorMessage.includes("Password")) {
          setErrors((prev) => ({ ...prev, password: errorMessage }));
        }
      }
    } catch (error) {
      setToastState({
        isOpen: true,
        type: "error",
        title: "Connection Error",
        message: "Please check your internet connection and try again",
      });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateForm(false)) {
      setToastState({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Please check the form for errors",
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
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        
        setToastState({
          isOpen: true,
          type: "success",
          title: "Success",
          message: "Login successful!"
        });

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setToastState({
          isOpen: true,
          type: "error",
          title: "Login Failed",
          message: data.message || "Invalid credentials"
        });
      }
    } catch (error) {
      setToastState({
        isOpen: true,
        type: "error",
        title: "Connection Error",
        message: "Please check your internet connection and try again",
      });
    }
  };

  return {
    isActive,
    setIsActive,
    formData,
    errors,
    toastState,
    handleInput,
    handleSignUp,
    handleSignIn
  };
};

export default useAuth;