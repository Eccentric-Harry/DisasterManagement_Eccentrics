// Layout.js
import React from 'react';
import Navbar from '../components/Navbar/Navbar'; // Adjust path as needed
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </main>
    </div>
  );
};

export default Layout;
