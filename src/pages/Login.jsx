import React, { useState } from 'react';
import bgImage from '../assets/background.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    //  Save user info to localStorage
    localStorage.setItem("user", JSON.stringify({ 
      token: await user.getIdToken(), 
      email: user.email 
    }));

    //  Navigate to the protected route
    navigate('/game');
  } catch (err) {
    console.error("Login error:", err.message);
    setError("Oops! Something went wrong while logging in. Please check your email and password and try again.");
  }
};

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Top Navbar */}
      <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center bg-[#12194f] border-b border-[#2c3e70] rounded-b-xl z-10">
        <h1 className="text-3xl font-bold text-white mx-auto">CATCH THE FAKE</h1>
        <div className="space-y-1 cursor-pointer absolute right-6 top-5">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </div>

      {/* Login Box */}
      <div className="mt-28 bg-[#111c44]/90 p-10 rounded-2xl shadow-xl w-full max-w-md z-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Log in</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email ID</label>
          <input
            type="email"
            placeholder='Enter Email Id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-[#1c2a5a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-[#1c2a5a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-3 top-10 text-gray-300 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
        )}

        <div className="mb-6 text-sm text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/signup')}>
          New User? Sign-up Here!
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:brightness-110 transition text-white font-semibold shadow-[0_0_8px_rgba(0,123,255,0.6)]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
