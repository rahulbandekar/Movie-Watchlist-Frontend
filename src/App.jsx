import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watchlist from "./pages/Watchlist";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
