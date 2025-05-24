import React from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../Components/Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[url('/src/assets/BG2.png')]  bg-cover bg-center text-white flex flex-col">
      
     


      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">CATCH THE FAKE</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-300">
          Beware of Fraud Messages! <br /> Spot the fraud and collect points.
        </p>

        {/* Login Button */}
        <Link to="/login">
          <button className="py-3 px-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:brightness-110 transition text-white font-semibold shadow-[0_0_10px_rgba(0,123,255,0.6)]">
            Log in
          </button>
        </Link>

        {/* Register Link */}
        <p className="mt-6 text-sm text-gray-300">
          Don’t have log in?{' '}
          <Link to="/signup" className="text-blue-400 underline hover:text-blue-300">
            Register yourself
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
