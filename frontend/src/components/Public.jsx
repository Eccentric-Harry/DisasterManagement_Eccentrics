import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const DisasterResponsePage = () => {
  const navigate = useNavigate(); // Create a navigate function

  return (
    <div className="bg-gray-600 text-gray-100">
      {/* Hero Section */}
      <header
        className="relative w-full h-[80vh] bg-cover bg-center" // Increased height to 80vh
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6471926/pexels-photo-6471926.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
          backgroundSize: "cover", // Ensures the background image covers the area
        }}
      >
        {/* Left-Side Gradient Overlay for Darker Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-70"></div>

        {/* Navigation Bar */}
        <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-4 text-white z-10">
          <div className="flex items-center">
            <img src="your-logo.png" alt="Bold Aid Logo" className="h-10 mr-2" />
            <h1 className="text-2xl font-bold">Bold Aid</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:underline">Home</a>
            <a href="/" className="hover:underline">About Us</a>
            <a href="/" className="hover:underline">Media</a>
            <a href="/" className="hover:underline">Shop</a>
            <a href="/" className="hover:underline">Volunteer</a>
            <a href="/" className="hover:underline">Request Demo</a>
          </div>
          <button className="bg-red-500 px-4 py-2 rounded-full text-white">Donate</button>
        </nav>

        {/* Hero Content */}
        <div className="relative flex flex-col items-start justify-center h-full text-left text-white z-10 px-6 md:px-16 lg:px-32">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Your compassion <br className="hidden md:block" /> becomes a lifeline <br className="hidden md:block" /> in the storm.
          </h2>
          <p className="mt-2 text-sm md:text-base lg:text-lg">
          United in compassion, we rise to rebuild  <br className="hidden md:block" /> after natural disasters strike.
          </p>
          <div className="mt-4 flex flex-col space-y-3"> {/* Flex column for vertical stacking */}
            <button 
              onClick={() => navigate('/login')} // Navigate to Share Incident route
              className="bg-red-500 hover:bg-red-600 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold"
            >
              Report Now
            </button>
            <button 
              onClick={() => navigate('/support')} // Navigate to Support route
              className="border border-red-500 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold"
            >
              Support
            </button>
          </div>
        </div>
      </header>

      {/* Information Section */}
      <section className="py-8 text-center"> {/* Reduced margin-top to 8 */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Get Involved to Help Save and Rebuild
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          The lives of those affected by natural disasters.
        </p>

        {/* Cards Section */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-10 space-y-6 md:space-y-0 md:space-x-10">
          {/* Admin Login Card */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-80">
            <h3 className="text-2xl text-gray-600 font-bold mb-4">Admin Login</h3>
            <p className="text-gray-600">
              Access tools and information to manage disaster response efforts effectively.
            </p>
            <button 
              onClick={() => navigate('/login')} // Navigate to Admin Login route
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full mt-6"
            >
              Login as Admin
            </button>
          </div>

          {/* User Login Card */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-80">
            <h3 className="text-2xl text-gray-600 font-bold mb-4">User Login</h3>
            <p className="text-gray-600">
              Sign in to report incidents and receive updates on disaster management efforts.
            </p>
            <button 
              onClick={() => navigate('/login')} // Navigate to User Login route
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full mt-6"
            >
              Login as User
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row">
  {/* Image Section */}
  <div className="md:w-1/2 bg-red-600 flex items-center justify-center p-8">
    <div className="text-center">
      <h3 className="text-3xl font-bold text-white">Make an Impact</h3>
      <p className="mt-4 text-lg text-white">
        Your contributions help us deliver essential supplies and support to disaster-stricken areas. Together, we can restore hope.
      </p>
      <p className="mt-4 text-lg text-white">
        In disaster management, effective resource allocation is crucial. 
        Before a disaster strikes, our rescue team prepares by identifying vulnerable areas, 
        allocating resources strategically, and establishing communication networks. 
        After the event, we assess the damage, mobilize additional support, 
        and ensure that aid reaches those who need it most.
      </p>
    </div>
  </div>
  {/* Text Section */}
  <div className="md:w-1/2 bg-gray-800 relative">
    <img
      src="https://images.pexels.com/photos/17809395/pexels-photo-17809395/free-photo-of-an-ambulance-of-the-chicago-fire-department-on-the-street.jpeg?auto=compress&cs=tinysrgb&w=600"
      alt="Disaster Relief Efforts"
      className="object-cover w-full h-full"
    />
  </div>
</section>


    </div>
  );
};

export default DisasterResponsePage;
