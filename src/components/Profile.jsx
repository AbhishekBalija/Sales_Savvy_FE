/* eslint-disable react/prop-types */
import { User, Calendar, Shield } from "lucide-react";
import useProfile from "../hooks/useProfile";

const Profile = ({ isOpen, onClose }) => {
  const {
    profile,
    isEditing,
    setIsEditing,
    formData,
    setFormData,
    handleSubmit,
  } = useProfile();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-lg bg-purple-100">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h1 className="text-3xl font-bold mb-6 text-purple-600">My Profile</h1>
        {!isEditing ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center shadow-md">
                <User className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{profile?.username}</h2>
                <p className="text-gray-500">{profile?.email}</p>
              </div>
            </div>
            <div className="grid gap-4 pt-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-gray-700 font-medium">Role:</span>
                <span className="font-semibold text-gray-900">
                  {profile?.role}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-gray-700 font-medium">Member since:</span>
                <span className="font-semibold text-gray-900">
                  {profile?.created_at}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-transform transform hover:scale-105 shadow-md"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-transform transform hover:scale-105 shadow-md"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    username: profile?.username,
                    email: profile?.email,
                  });
                }}
                className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105 shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
