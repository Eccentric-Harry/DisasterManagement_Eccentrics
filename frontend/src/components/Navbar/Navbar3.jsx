import './Navbar.css'
import logo from '../../assets/srtlogo.png'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar3 = () => {
    const navigate = useNavigate();
    // const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    return (
      <div className="navbar bg-gray-800 text-white shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/"><img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" /> {/* Adjust the logo path as needed */}</Link>
          {/* <div className="logo-text text-lg font-semibold">
            SRT <span className="text-teal-400">Emergency Response</span>
          </div> */}
        </div>
  
        {/* Navigation Buttons */}
        <ul className="flex gap-4 items-center">
          <li>
            <button
              onClick={() => navigate('/dash/user')}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Report Disaster
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/dash/user/disasters')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              My Disasters
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  };
  

export default Navbar3;