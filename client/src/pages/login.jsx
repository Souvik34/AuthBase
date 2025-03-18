import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: response.data.email, name: response.data.name })
        );
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
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-700">
              Email
            </label>
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

          <div>
            <label  className="block text-base font-medium text-gray-700">
              Password
            </label>
            <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
          </div>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Sign in
          </button>
        </form>

        <p className="mt-10 text-center text-base text-gray-500">
          Not a member?{" "}
          <a href="/signup" className="font-semibold text-blue-500 hover:text-blue-700">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
