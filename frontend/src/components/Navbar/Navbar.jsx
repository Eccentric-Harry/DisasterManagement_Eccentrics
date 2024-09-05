import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/path/to/logo.png" alt="Logo" className="h-10 w-auto" /> {/* Adjust logo size as needed */}
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-8 mx-auto">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-gray-300 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-white hover:text-gray-300 transition"
            >
              Share Incidents
            </button>
            <button
              onClick={() => navigate('/about')}
              className="text-white hover:text-gray-300 transition"
            >
              Active Incidents
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
