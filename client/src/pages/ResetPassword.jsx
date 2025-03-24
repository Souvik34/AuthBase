import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/forgot-password", { email });

      if (response.data.success) {
        setMessage("A reset link has been sent to your email.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center mt-20 px-10 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-3xl flex font-bold items-center justify-center text-blue-500">AuthBase</div>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Reset Your Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-700">
              Enter your email
            </label>
            <div className="mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Send Reset Link
          </button>
        </form>

        <p className="mt-10 text-center text-base text-gray-500">
          Remembered your password?{" "}
          <button onClick={() => navigate("/login")} className="font-semibold text-blue-500 hover:text-blue-700">
            Go back to login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
