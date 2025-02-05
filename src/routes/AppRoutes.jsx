import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";
import CustomerHome from "../pages/CustomerHome";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/home" element={<CustomerHome />} />
    </Routes>
  );
};

export default AppRoutes;
