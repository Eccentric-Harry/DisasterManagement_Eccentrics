import './Navbar.css'
import logo from '../../assets/logo.png'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar2 = () => { 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

  return (
    <div className="navbar bg-gray-600 text-white shadow-md py-2 px-8 flex justify-between items-center sticky top-0 z-50">
  {/* Logo Section */}
  <div className="flex items-center">
    <Link to="/">
      {/* Adjust the logo size as needed */}
      <img src={logo} alt="Logo" className="h-12 w-12 mr-3 object-contain" /> {/* Adjust height and width as needed */}
    </Link>
  </div>

  {/* Navigation Buttons */}
  <ul className="flex items-center gap-4">
    <li className="ml-auto">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Logout
      </button>
    </li>
  </ul>
</div>


  )
}

export default Navbar2;