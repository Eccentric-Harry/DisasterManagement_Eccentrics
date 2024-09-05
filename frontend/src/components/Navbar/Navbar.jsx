import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.jpg"

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white shadow-md z-50">
      <div className="max-w-full mx-auto px-4"> {/* Removed width limitation and reduced padding */}
        <div className="flex items-center justify-between h-auto">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-20 w-20 ml-16" /> {/* Adjust logo size as needed */}
            </Link>
          </div>
  
          {/* Navigation Links */}
          <nav className="flex space-x-8 ml-auto"> {/* Reduced space between links */}
            <button
              onClick={() => navigate('/')}
              className='inline-block px-6 py-2 duration-200 hover:bg-white hover:text-black hover:font-bold rounded-full'
            >
              Home
            </button>

            <button
              onClick={() => navigate('/login')}
              className='inline-block px-6 py-2 duration-200 hover:bg-white hover:text-black hover:font-bold rounded-full'
            >
              Share Incidents
            </button>

            <button
              onClick={() => navigate('/active-incidents')}
              className='inline-block px-6 py-2 duration-200 hover:bg-white hover:text-black hover:font-bold rounded-full'
            >
              Active Incidents
            </button>

            <button
              onClick={() => navigate('/support')}
              className='inline-block px-6 py-2 duration-200 hover:bg-white hover:text-black hover:font-bold rounded-full'
            >
              Support
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
  
  
  
  
};

export default Navbar;
