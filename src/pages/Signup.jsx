import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import Background from "../assets/Background.png";

const SignupPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        email,
        score: 0, // initial score
        createdAt: new Date()
      });

      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
           style={{ backgroundImage: `url(${Background})` }}>
      
      {/* Top Navbar */}
      <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center bg-[#12194f]/70 border-b border-[#2c3e70] rounded-b-xl z-10">
        <h1 className="text-3xl font-bold text-white mx-auto">CATCH THE FAKE</h1>
        <div className="space-y-1 cursor-pointer absolute right-6 top-5">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </div>

      {/* Signup Box */}
      <div className="mt-32 bg-[#111c44]/80 p-10 rounded-2xl shadow-xl w-full max-w-3xl z-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Register yourself</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 rounded bg-[#1c2a5a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone No.</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone no."
              className="w-full p-3 rounded bg-[#1c2a5a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 rounded bg-[#1c2a5a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full p-3 rounded bg-[#1c2a5a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Enter Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full p-3 rounded bg-[#1c2a5a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6 text-sm text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/login')}>
          Existing User? Log-in Here!
        </div>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-400 mt-4 text-center">{success}</p>}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSignup}
            className="py-3 px-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:brightness-110 transition text-white font-semibold shadow-[0_0_10px_rgba(0,123,255,0.6)]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
