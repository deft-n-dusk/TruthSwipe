import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   const q = query(
  collection(db, "leaderboard"), 
  orderBy("score", "desc"),
  limit(10)
);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "Unnamed",
          score: data.score || 0,
          isCurrentUser: auth.currentUser && doc.id === auth.currentUser.uid,
        };
      });

      setLeaderboardData(usersData);
    });

    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  return (
    <div className="min-h-screen bg-[url('/src/assets/Background.png')] bg-cover flex flex-col items-center justify-center px-4 text-white">
      <div className="w-full sticky top-0 z-50 px-4 bg-[rgba(0,0,0,0.4)] backdrop-blur">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col items-center w-9/12 justify-center">
        <div className="bg-[#1b1d4a] p-6 rounded-3xl shadow-xl w-full max-w-[500px] border border-blue-600">
          <h2 className="text-xl font-semibold text-center mb-4">LEADERBOARD</h2>

          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent scrollbar-thumb-rounded-full max-h-72 pr-2">
            {leaderboardData.length > 0 ? (
              leaderboardData.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl mb-2 ${
                    player.isCurrentUser
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-[#2a2c5f] text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-white font-semibold">{index + 1}</div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">{player.name}</div>
                  </div>
                  <div className="text-sm">{player.score} points</div>
                </div>
              ))
            ) : (
              <p className="text-center text-white mt-4">Loading leaderboard...</p>
            )}
          </div>
        </div>

        {/* Share */}
        <div className="flex gap-4 mt-8">
          <button
  onClick={() => {
    if (navigator.share) {
      navigator
        .share({
          title: "Catch The Fake - Play Now!",
          text: "Try out this cool game to catch fake messages!",
          url: window.location.href, // current page URL
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // fallback for browsers that don't support the Web Share API
      alert("Sharing not supported on this browser. You can copy the URL: " + window.location.href);
    }
  }}
  className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-800 to-blue-950 border-2 border-blue-200 rounded-md text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
>
  🔗 Share
</button>
          <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-800 to-blue-950 border-2 border-blue-200 rounded-md text-lg font-semibold shadow-lg hover:scale-105 transition-transform" onClick={() => navigate("/game")}>
            🔄 Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
