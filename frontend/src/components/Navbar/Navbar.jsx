import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-gray-600 backdrop-blur-md text-white shadow-md z-50 transition-all duration-300 ease-in-out">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-auto">
            {/* Sidenav Toggle Button */}
            <button
              onClick={toggleSidenav}
              className="text-white text-xl ml-4 focus:outline-none p-2"
            >
              <FontAwesomeIcon icon={isSidenavOpen ? faTimes : faBars} size="1x" />
            </button>

            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/">
                <img 
                  src="https://tse4.mm.bing.net/th?id=OIP.NAnczBwAQlOcFWCMyYtm5gHaF7&pid=Api&P=0&h=180" 
                  alt="Logo" 
                  className="h-14 w-14 ml-4 rounded-xl bg-transparent"
                />
              </Link>
              {/* Text Next to Logo */}
              <span className="ml-2 text-xl font-bold text-white">Sanrakshak</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex space-x-8 ml-auto">
              <div className="flex space-x-8 ml-4"> {/* Added margin on left */}
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

      {/* Sidenav */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 transform ${
          isSidenavOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 shadow-lg`}
      >
        <div className="flex flex-col h-full p-6">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">Menu</h2>
          <button
            onClick={() => navigate('/info')}
            className="mb-4 text-left px-4 py-3 rounded hover:bg-gray-800 transition duration-200 w-full text-lg"
          >
            Info
          </button>
          <button
            onClick={() => navigate('/assistance')}
            className="mb-4 text-left px-4 py-3 rounded hover:bg-gray-800 transition duration-200 w-full text-lg"
          >
            Assistance
          </button>
          <button
            onClick={() => navigate('/alert')}
            className="mb-4 text-left px-4 py-3 rounded hover:bg-gray-800 transition duration-200 w-full text-lg"
          >
            Alert
          </button>
          {/* Add more sidenav items here if needed */}
        </div>
      </div>
    </>
  );
};

export default Navbar;