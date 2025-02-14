import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import Profile from "../components/Profile";

const ProfilePage = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    setIsProfileOpen(true);
  }, []);

  const handleClose = () => {
    setIsProfileOpen(false);
    navigate("/home"); // Redirect to home or another page
  };

  return (
    <div className="container mx-auto p-6">
      <Profile isOpen={isProfileOpen} onClose={handleClose} />
    </div>
  );
};

export default ProfilePage;
