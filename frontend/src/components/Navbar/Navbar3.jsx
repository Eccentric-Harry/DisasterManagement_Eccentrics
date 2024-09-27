import './Navbar.css'
import logo from '../../assets/logo.png'
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
              {/* <Link to="/">
                  <img 
                      src="/logo.png" 
                      alt="Logo" 
                      className="h-4 w-4 mr-2" 
                      onError={(e) => e.target.src = '/path/to/placeholder.png'} // Optional: handle missing logo with a placeholder
                  /> */}
              {/* </Link> */}
              {/* Uncomment and adjust if needed */}
              {/* <div className="logo-text text-lg font-semibold">
                  SRT <span className="text-teal-400">Emergency Response</span>
              </div> */}
          </div>
  
          {/* Navigation Buttons */}
          <ul className="flex gap-4 items-center">
              <li>
                  <button
                      onClick={() => navigate('/dash/user')}
                      className="inline-block px-6 py-2 border border-transparent duration-200 hover:border-red-500 hover:bg-transparent hover:text-white rounded-full"
                  >
                      Report Disaster
                  </button>
              </li>
              <li>
                  <button
                      onClick={() => navigate('/dash/user/disasters')}
                      className=" inline-block px-6 py-2 border border-transparent duration-200 hover:border-red-500 hover:bg-transparent hover:text-white rounded-full"
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