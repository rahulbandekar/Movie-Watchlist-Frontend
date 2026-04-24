import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { addToWatchlist } from "../services/watchlistService";
import { Calendar, Clock, Plus, Check, Film } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAddToWatchlist = async () => {
    if (!user) {
      setMessage("Please login first");
      setTimeout(() => setMessage(""), 3000);
      navigate('/login', { state: { from: '/' } });
      return;
    }

    setAdding(true);
    const result = await addToWatchlist({
      movieId: movie.id,
      status: "PLANNED",
    });
    if (result.success) {
      setAdded(true);
      setMessage("Added to watchlist!");
    } else {
      setMessage(result.message);
    }
    setTimeout(() => setMessage(""), 3000);
    setAdding(false);
  };

  return (
    <div className="movie-card group">
      <div className="relative overflow-hidden">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <Film className="w-16 h-16 text-gray-600" />
            <p className="text-gray-500 text-sm">No poster</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
          {movie.title}
        </h3>

        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{movie.releaseYear}</span>
          </div>
          {movie.runtime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{movie.runtime} min</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genres?.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-400"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/movies/${movie.id}`}
            className="flex-1 text-center px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Details
          </Link>
          <button
            onClick={handleAddToWatchlist}
            disabled={adding || added}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              added
                ? "bg-green-600 cursor-default"
                : "bg-primary hover:bg-red-700 hover:scale-105"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{adding ? "Adding..." : "Watchlist"}</span>
              </>
            )}
          </button>
        </div>

        {message && (
          <div
            className={`mt-3 text-center text-sm ${
              added || message === "Added to watchlist!"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
