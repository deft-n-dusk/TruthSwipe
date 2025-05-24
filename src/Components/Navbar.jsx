import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");

    // Clear the saved user data from localStorage
    localStorage.removeItem("user");

    navigate('/login'); // redirect to login page
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

  return (
    <nav className="w-full px-8 py-6 bg-blue-950 backdrop-blur-md border border-blue-500 rounded-xl shadow-md flex items-center justify-between text-white">
      <div className="text-center w-full text-xl font-bold ">
        <span className="text-4xl">CATCH THE FAKE</span>
      </div>

      <div className="absolute right-6 top-9">
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center space-y-1 group"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-5"></span>
          <span className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-4"></span>
          <span className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-5"></span>
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-blue-950 border border-blue-500 rounded-xl shadow-lg flex flex-col text-white z-50"
            onClick={() => setMenuOpen(false)} // close on any click inside menu
          >
            <Link
              to="/leaderboard"
              className="px-4 py-3 hover:bg-blue-800 rounded-t-xl"
            >
              Leaderboard
            </Link>
            <Link to="/game" className="px-4 py-3 hover:bg-blue-800">
              Game
            </Link>
            <button
              onClick={handleLogout}
              className="text-left px-4 py-3 hover:bg-red-700 rounded-b-xl"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
