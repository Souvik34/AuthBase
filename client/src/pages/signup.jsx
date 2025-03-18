import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.termsAccepted) {
      setError("You must accept the Terms and Conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccessMessage("Signup successful! Redirecting to login...");
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: response.data.email, name: response.data.name })
        );
        setTimeout(() => navigate("/login"), 2000); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg p-6">
        <div className="text-3xl flex font-bold items-center justify-center text-blue-500">AuthBase</div>
        <h2 className="mt-10 mb-5 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-900">Full Name</label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <div className="mt-2">
              <input
                type="password"
                name="confirmPassword"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="mt-2">
              <input
                type="checkbox"
                name="termsAccepted"
                className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <label className="ml-2 text-base text-gray-600">
                I accept the{" "}
                <a href="#" className="font-semibold text-blue-500 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-base text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-blue-500">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
