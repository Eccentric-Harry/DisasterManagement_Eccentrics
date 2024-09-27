// Layout.js
import React from 'react';
import Navbar from '../components/Navbar/Navbar'; // Adjust path as needed
import { Outlet } from 'react-router-dom';
import DashFooter from './dashFooter';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </main>
      <DashFooter/>
    </div>
  );
};

export default Layout;
