import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Particles from "../components/ParticlesBackground";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const {
    isActive,
    setIsActive,
    formData,
    errors,
    handleInput,
    handleSignUp,
    handleSignIn,
  } = useAuth();

  return (
    <div className="relative h-screen overflow-hidden">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false} // Changed to false to prevent staying open on blur
        draggable
        pauseOnHover={false} // Changed to false to ensure it closes after 3 seconds
        theme="colored"
        limit={1} // Added to prevent multiple toasts stacking
      />
      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={["#7e47c2", "#7e47c2"]}
          particleCount={2000}
          particleSpread={30}
          speed={0.5}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
        {/* Main Container */}
        <div
          className={`bg-white border-1 border-[#7e47c2] rounded-3xl shadow-lg relative overflow-hidden w-full max-w-4xl min-h-[480px] transition-all duration-600 ease-in-out ${
            isActive ? "active" : ""
          }`}
        >
          {/* Sign Up Form */}
          <div
            className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-600 ease-in-out ${
              isActive
                ? "translate-x-full opacity-100 z-10"
                : "opacity-100 z-20"
            }`}
          >
            <form
              onSubmit={handleSignUp}
              className="bg-white flex flex-col items-center justify-center h-full px-10 py-0"
            >
              <h1 className="text-2xl font-bold mb-4">Create Account</h1>
              {/* Form inputs for sign up */}
              <div className="w-full">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={`w-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.username ? "border-red-500" : "border-transparent"
                  } my-2 py-2 px-4 rounded-lg text-sm outline-none`}
                  value={formData.username}
                  onChange={handleInput}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`w-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-transparent"
                  } my-2 py-2 px-4 rounded-lg text-sm outline-none`}
                  value={formData.email}
                  onChange={handleInput}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.password ? "border-red-500" : "border-transparent"
                  } my-2 py-2 px-4 rounded-lg text-sm outline-none`}
                  value={formData.password}
                  onChange={handleInput}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="w-full">
                <select
                  name="role"
                  className={`w-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.role ? "border-red-500" : "border-transparent"
                  } my-2 py-2 px-4 rounded-lg text-sm outline-none`}
                  value={formData.role}
                  onChange={handleInput}
                >
                  <option value="">Select Role</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#512da8] text-white text-xs py-2 px-11 rounded-lg font-semibold uppercase mt-2 cursor-pointer border border-transparent hover:shadow-lg hover:shadow-[#7e57c2]/50  transition-colors"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div
            className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-600 ease-in-out ${
              isActive ? "opacity-0 z-10" : "opacity-100 z-20"
            }`}
          >
            <form
              onSubmit={handleSignIn}
              className="bg-white flex flex-col items-center justify-center h-full px-10 py-0"
            >
              <h1 className="text-2xl font-bold mb-4">Sign In</h1>
              <div className="w-full">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={`w-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.username ? "border-red-500" : "border-transparent"
                  } my-2 py-2 px-4 rounded-lg text-sm outline-none`}
                  value={formData.username}
                  onChange={handleInput}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.password ? "border-red-500" : "border-transparent"
                  } my-2 py-2 px-4 rounded-lg text-sm outline-none`}
                  value={formData.password}
                  onChange={handleInput}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <Link
                to="#"
                className="text-xs text-gray-700 my-3 hover:underline"
              >
                Forgot Your Password?
              </Link>
              <button
                type="submit"
                className="bg-[#512da8] text-white text-xs py-2 px-11 rounded-lg font-semibold uppercase mt-2 cursor-pointer border border-transparent hover:shadow-lg hover:shadow-[#7e57c2]/50 transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Toggle Container */}
          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out ${
              isActive
                ? "-translate-x-full rounded-r-[150px]"
                : "rounded-l-[150px]"
            } z-40`}
          >
            <div
              className={`bg-gradient-to-r from-[#9810fa] to-[#5c34b9] h-full text-white relative -left-full w-[200%] transition-all duration-600 ease-in-out ${
                isActive ? "translate-x-1/2" : ""
              }`}
            >
              <div
                className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-all duration-600 ease-in-out ${
                  isActive ? "translate-x-0" : "-translate-x-[200%]"
                }`}
              >
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-sm leading-5 my-5">
                  Enter your personal details to use all of site features
                </p>
                <button
                  onClick={() => setIsActive(false)}
                  className="bg-transparent border border-white text-white text-xs py-2 px-11 rounded-lg font-semibold uppercase cursor-pointer hover:bg-white hover:text-[#512da8] transition-colors"
                >
                  Sign In
                </button>
              </div>
              <div
                className={`absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-all duration-600 ease-in-out ${
                  isActive ? "translate-x-[200%]" : "translate-x-0"
                }`}
              >
                <h1 className="text-2xl font-bold">Hello, Friend!</h1>
                <p className="text-sm leading-5 my-5">
                  Register with your personal details to use all of site
                  features
                </p>
                <button
                  onClick={() => setIsActive(true)}
                  className="bg-transparent border border-white text-white text-xs py-2 px-11 rounded-lg font-semibold uppercase cursor-pointer hover:bg-white hover:text-[#512da8] transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
