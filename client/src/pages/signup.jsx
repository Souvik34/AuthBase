import React, { useState } from "react";
import Login from "./Login";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(""); // Clear errors

    console.log("Form submitted:", formData);
    alert("Signup successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-white rounded-lg p-6">
      <div className='text-3xl flex font-bold items-center justify-center text-blue-500'>AuthBase</div>
          <h2 className="mt-10 mb-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          <label  className="block text-base font-medium text-gray-900">
                Full name
              </label>
              <div className="mt-2">
            <input
              type="text"
              name="name"
             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <div className="mt-2">
            <input
              type="password"
              name="confirmPassword"
             className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder=""
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
              <a href="#" className=" font-semibold text-blue-500 hover:underline">
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
            <a href="/Login" className=" font-semibold text-blue-500">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
