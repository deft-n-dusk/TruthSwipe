import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bg from '../assets/Background.png';
import Navbar from "../Components/Navbar";
import overlay from '../assets/Background_effect.png';
import Star from "../assets/star.png";

const GameOver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || 0; // get score from router state

  const bgStyle = {
    backgroundImage: `url(${overlay}), url(${bg})`,
    backgroundSize: 'cover, cover',
    backgroundPosition: 'center, center',
    backgroundRepeat: 'no-repeat, no-repeat'
  };

  const handleContinue = () => {
    navigate("/game");
  };

  return (
    <div style={bgStyle} className="min-h-screen flex flex-col text-white font-sans">
      {/* Navbar */}
      <div className="w-full sticky top-0 z-50 px-4 bg-[rgba(0,0,0,0.4)] backdrop-blur">
        <Navbar />
      </div>

      {/* Main Game Over Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mt-4 p-10 bg-gradient-to-l from-blue-950 to-blue-900 rounded-3xl border border-blue-500 shadow-xl text-center w-[90%] max-w-md">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">GAME</h2>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">OVER</h2>
          <p className="text-lg mb-6">You have scored</p>

          {/* Score Box */}
          <div className="bg-[#060c2c] flex items-center justify-center gap-4 p-2 w-8/12 m-auto rounded-2xl mb-8">
            <img src={Star} alt="star" className="w-20 h-20 object-contain" />
            <span className="text-5xl font-bold">{score}</span>
            <span className="text-lg mt-4">Points</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-800 to-blue-950 border-2 border-blue-400 rounded-md text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default GameOver;
