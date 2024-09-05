import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.jpg"
import './Navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-700  backdrop-blur-md text-white shadow-md z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-auto">
         
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-16 w-16 ml-16 rounded-xl" />
            </Link>
          </div>
  

          <nav className="flex space-x-8 ml-auto">
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
              onClick={() => navigate('/activeIncidents')}
              className="text-white hover:text-gray-300 transition"
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
