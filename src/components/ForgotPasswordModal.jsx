/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiX, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const {
    loading,
    error,
    step,
    email,
    setEmail,
    sendEmail,
    verifyOtp,
    changePassword,
    setStep,
  } = useForgotPassword();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      await sendEmail(email);
    } else if (step === 2) {
      await verifyOtp(otp);
    } else if (step === 3) {
      if (password === confirmPassword) {
        await changePassword(password);
      }
    }
  };

  const renderProgressBar = () => {
    const steps = ["Email", "Verify", "Reset"];
    return (
      <div className="flex items-center justify-between mb-8 px-4">
        {steps.map((label, index) => (
          <div key={label} className="flex items-center">
            <div
              className={`
              flex items-center justify-center w-8 h-8 rounded-full 
              ${
                index + 1 === step
                  ? "bg-purple-500 text-white"
                  : index + 1 < step
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }
              transition-colors duration-200
            `}
            >
              {index + 1 < step ? "✓" : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-1 mx-2 ${
                  index + 1 < step ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX size={20} />
        </button>

        {step < 4 && renderProgressBar()}

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Forgot Password?
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Enter your email address to receive a verification code
                </p>
              </div>
              <div>
                <div className="relative">
                  <FiMail className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Enter Verification Code
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  We&apos;ve sent a code to {email}
                </p>
              </div>
              <div className="flex justify-center gap-2">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const newOtp = otp.split("");
                      newOtp[i] = e.target.value;
                      setOtp(newOtp.join(""));
                      if (e.target.value && e.target.nextSibling) {
                        e.target.nextSibling.focus();
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Reset Password
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Create a new password for your account
                </p>
              </div>
              <div>
                <div className="relative">
                  <FiLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="New password"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <FiLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Password Reset Successfully
              </h3>
              <p className="text-gray-500 text-sm">
                You can now log in with your new password
              </p>
              <button
                onClick={onClose}
                className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}

          {step !== 4 && (
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading
                  ? "Processing..."
                  : step === 1
                  ? "Send Code"
                  : step === 2
                  ? "Verify Code"
                  : "Reset Password"}
              </button>

              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 text-sm"
                >
                  <FiArrowLeft size={16} />
                  Back to previous step
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
