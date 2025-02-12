import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";
import CustomerHome from "../pages/CustomerHome";
import NavBar from "../components/NavBar";
import CartPage from "../pages/CartPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/home" element={<CustomerHome />} />
      <Route path="/nav" element={<NavBar />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;
