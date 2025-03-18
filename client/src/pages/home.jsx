import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-3xl font-bold text-blue-500">AuthBase</div>
      <h2 className="mt-4 text-xl font-semibold text-gray-700">Welcome to AuthBase, {user.name || 'User'}!</h2>
      <button
        onClick={handleSignOut}
        className="mt-10 px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
