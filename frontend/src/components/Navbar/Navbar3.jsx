import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-600 backdrop-blur-md text-white shadow-md z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-auto">
          {/* Logo and Text Section */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <img 
                src="https://tse4.mm.bing.net/th?id=OIP.NAnczBwAQlOcFWCMyYtm5gHaF7&pid=Api&P=0&h=180" 
                alt="Logo" 
                className="h-16 w-16 ml-4 rounded-xl bg-transparent" // Adjusted size to h-16 w-16
              />
            </Link>
            {/* Text Next to Logo */}
            <span className="ml-2 text-xl font-bold">Sanrakshak</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-8 ml-auto">
            <div className="flex space-x-8 ml-4">
              <button
                onClick={() => navigate('/')}
                className='inline-block px-6 py-2 border border-transparent duration-200 hover:border-red-500 hover:bg-transparent hover:text-white rounded-full'
              >
                Home
              </button>

              <button
                onClick={() => navigate('/login')}
                className='inline-block px-6 py-2 border border-transparent duration-200 hover:border-red-500 hover:bg-transparent hover:text-white rounded-full'
              >
                Share Incidents
              </button>

              <button
                onClick={() => navigate('/activeIncidents')}
                className='inline-block px-6 py-2 border border-transparent duration-200 hover:border-red-500 hover:bg-transparent hover:text-white rounded-full'
              >
                Active Incidents
              </button>

              <button
                onClick={() => navigate('/support')}
                className='inline-block px-6 py-2 border border-transparent duration-200 hover:border-red-500 hover:bg-transparent hover:text-white rounded-full'
              >
                Support
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
