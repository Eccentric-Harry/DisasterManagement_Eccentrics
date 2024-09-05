import React from 'react';
import Navbar from '../components/Navbar/Navbar'; // Ensure the path is correct

const Public = () => {
  return (
    <div className="bg-gray-200 min-h-screen"> {/* Set background to light gray */}
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-16"> {/* Adjust padding-top to avoid content overlap with the fixed navbar */}
        <section className="flex flex-col items-center justify-center min-h-screen mt-[-50px]"> {/* Move section upwards */}
          <div className="text-center">
            <h1 className="text-8xl font-bold text-gray-900 mb-4">Active Cases</h1>
            <h1 className="text-[100px] text-gray-700 mb-8"> {/* Further increase the size of the number */}
              69
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Public;
