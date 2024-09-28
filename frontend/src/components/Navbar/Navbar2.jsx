import './Navbar.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar2 = () => { 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="navbar bg-gray-600 text-white shadow-md py-1 px-8 flex justify-between items-center sticky top-0 z-50 h-16">
            {/* Logo Section */}
            <div className="flex items-center">
                <Link to="/">
                    {/* Adjust the logo size and add rounded corners */}
                    <img 
                        src="https://tse4.mm.bing.net/th?id=OIP.NAnczBwAQlOcFWCMyYtm5gHaF7&pid=Api&P=0&h=180" 
                        alt="Logo" 
                        className="h-16 w-16 rounded-xl" // Added rounded-xl to make the logo rounded
                    />
                </Link>
                {/* Text Next to Logo */}
                <span className="ml-2 text-xl font-bold">Sanrakshak</span>
            </div>

            {/* Navigation Buttons */}
            <ul className="flex items-center gap-4">
                <li className="ml-auto">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-3 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Navbar2;
