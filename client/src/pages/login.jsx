import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "./Signup";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("YOUR_BACKEND_LOGIN_API", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // If using cookies
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Store token if using JWT
        alert("Login successful!");
        navigate("/dashboard"); // Redirect after login
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center mt-20 px-10 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-3xl flex font-bold items-center justify-center text-blue-500">AuthBase</div>
        <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-base text-gray-500">
          Not a member?{" "}
          <a href="/Signup" className="font-semibold text-blue-500 hover:text-blue-700">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
