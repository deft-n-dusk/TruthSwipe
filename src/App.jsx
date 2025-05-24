import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import GameOver from "./pages/GameOver";
import Leaderboard from "./pages/Leaderboard";
import Body from "./pages/Body";
import Game from "./pages/Game";
import Navbar from "./Components/Navbar";
import ProtectedLayout from "./Components/ProtectedLayout"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route element={<ProtectedLayout />}>
          <Route path="/game" element={<Game key={Date.now()} />} />
          <Route path="/gameover" element={<GameOver />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
