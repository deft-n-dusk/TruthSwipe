import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";
import dummyMessages from "../utils/dummyMessages";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getDoc } from "firebase/firestore";

export default function Game() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [messagesShown, setMessagesShown] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // Clear any existing timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // Reset timer whenever currentIndex or feedback changes (new message or after feedback)
    clearTimer();
    setTimeLeft(10);

    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          // Time's up  (no score increment)
          clearTimer();
          handleSwipeTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearTimer();
    
  }, [currentIndex]);

  const handleSwipeTimeout = () => {
    setFeedback(null); // Clear feedback if any

    const nextShown = messagesShown + 1;
    if (nextShown >= 10) {
      saveScoreAndNavigate(score);
    } else {
      setMessagesShown(nextShown);
      setCurrentIndex((prev) => (prev + 1) % dummyMessages.length);
    }
  };

  const saveScoreAndNavigate = async (finalScore) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        let name = user.email; // fallback
        if (userDoc.exists()) {
          name = userDoc.data().name || name;
        }
        const userRef = doc(db, "leaderboard", user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          name,
          score: finalScore,
        });
      } catch (err) {
        console.error("Error saving score:", err);
      }
    }
    navigate("/gameover", { state: { score: finalScore } });
  };

  const handleSwipe = async (direction) => {
    clearTimer();

    const current = dummyMessages[currentIndex];
    const isCorrect =
      (direction === "up" && current.type === "fraud") ||
      (direction === "down" && current.type === "safe");

    const newScore = isCorrect ? score + 1 : score;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(newScore);

    setTimeout(async () => {
      setFeedback(null);
      const nextShown = messagesShown + 1;

      if (nextShown >= 10) {
        await saveScoreAndNavigate(newScore);
      } else {
        setMessagesShown(nextShown);
        setCurrentIndex((prev) => (prev + 1) % dummyMessages.length);
      }
    }, 1000);
  };

  const currentMessage = dummyMessages[currentIndex];

  return (
    <div className="min-h-screen bg-[url('/src/assets/Background.png')] bg-cover to-black text-white overflow-hidden">
      <div className="w-full sticky top-0 z-50 px-4 bg-[rgba(0,0,0,0.3)] backdrop-blur">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center">
        <img src="/src/assets/RedSemicircle.png" alt="" className="w-[30rem]" />
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-8">
        <div className="bg-blue-950 absolute opacity-80 top-[8rem] text-white text-3xl font-semibold flex items-center justify-center rounded-full mb-4 w-40 h-16 border-blue-400 border-[1px] pl-8 ">
          <img src="/src/assets/Star.png" alt="" className="w-[4rem] absolute left-1" />
          {score}
        </div>

        {/*Timer */}
        <div className="bg-blue-950 absolute opacity-80 top-[8rem] right-[5rem] text-white text-xl font-semibold flex items-center justify-center rounded-full mb-4 w-32 h-14 border-blue-400 border-[1px] ">
          Time: {timeLeft}s
        </div>

        <div className="absolute top-60 h-[250px] w-full max-w-md flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.4 }}
              drag="y"
              dragConstraints={{ top: -50, bottom: 50 }}
              onDragEnd={(event, info) => {
                if (info.offset.y < -100) {
                  handleSwipe("up");
                } else if (info.offset.y > 100) {
                  handleSwipe("down");
                }
              }}
              className="absolute w-72 h-56 cursor-grab"
            >
              
              <div
                className={`absolute text-black rounded-3xl shadow-xl px-16 py-24 text-center border-[1px]  ${currentMessage.bg}  
              ${feedback === "correct" ? "shadow-[0_0_40px_15px_rgba(34,197,94,0.7)]" : ""}
              ${feedback === "wrong" ? "shadow-[0_0_40px_15px_rgba(220,38,38,0.7)]" : ""}`}
              >
                <div
                  className={`absolute inset-0 rounded-3xl blur-xl opacity-30 pointer-events-none ${currentMessage.bg?.split(" ")[0]}`}
                />
                <div className="relative z-10">{currentMessage.text}</div>
              </div>
              
            </motion.div>
          </AnimatePresence>
        </div>

        {feedback && (
          <div
            className={`absolute bottom-20 z-20 px-6 py-3 rounded-full text-white text-xl font-semibold shadow-lg transition-all duration-300 ${
              feedback === "correct"
                ? "bg-green-600 bg-opacity-60 shadow-green-400"
                : "bg-red-600 bg-opacity-60 shadow-red-400"
            }`}
          >
            {feedback === "correct"
              ? `✅ Correct! It's a ${currentMessage.type} message`
              : `❌ Wrong! It's a ${currentMessage.type} message`}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center">
        <img
          src="/src/assets/GreenSemicircle.png"
          alt=""
          className="w-[30rem] absolute bottom-0"
        />
      </div>
    </div>
  );
}
