import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", formData);
      if (response.data.success) {
        if (formData.rememberMe) {
          localStorage.setItem("token", response.data.jwtToken);
          localStorage.setItem("user", JSON.stringify({ email: response.data.email, name: response.data.name }));
        } else {
          sessionStorage.setItem("token", response.data.jwtToken);
          sessionStorage.setItem("user", JSON.stringify({ email: response.data.email, name: response.data.name }));
        }
        navigate("/Home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center mt-20 px-10 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-3xl flex font-bold items-center justify-center text-blue-500">AuthBase</div>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-base font-medium text-gray-700">Email</label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* Password Input with Eye Toggle */}
          <div>
            <label className="block text-base font-medium text-gray-700">Password</label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-blue-500 hover:text-blue-700"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Sign in
          </button>
        </form>

        {/* GitHub OAuth Login Section */}
        <div className="mt-6">
          <p className="text-center text-gray-500 mb-4">Or sign in with</p>
          <button
            onClick={() => window.location.href = "http://localhost:5000/api/v1/auth/github"}
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
          >
            Sign in with GitHub
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-10 text-center text-base text-gray-500">
          Not a member?{" "}
          <a href="/signup" className="font-semibold text-blue-500 hover:text-blue-700">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
