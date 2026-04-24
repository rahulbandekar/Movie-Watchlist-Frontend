import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../services/movieService";
import { addToWatchlist } from "../services/watchlistService";
import { useAuth } from "../contexts/AuthContext";
import {
  Calendar,
  Clock,
  Star,
  Plus,
  Check,
  ArrowLeft,
  Film,
} from "lucide-react";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    const result = await getMovieById(id);
    if (result.success) {
      setMovie(result.data.data.movie);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleAddToWatchlist = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/movies/${id}` } });
      return;
    }

    setAdding(true);
    const result = await addToWatchlist({
      movieId: movie.id,
      status: "PLANNED",
    });
    if (result.success) {
      setAdded(true);
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Film className="w-16 h-16 text-primary animate-pulse" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl">{error || "Movie not found"}</p>
          <button onClick={() => navigate("/")} className="btn-primary mt-4">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-card rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Poster */}
            <div className="md:w-1/3">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Film className="w-24 h-24 text-gray-600" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 p-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>{movie.releaseYear}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-5 h-5" />
                    <span>{movie.runtime} minutes</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-400"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed mb-8">
                {movie.overview}
              </p>

              <button
                onClick={handleAddToWatchlist}
                disabled={adding || added}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  added
                    ? "bg-green-600 cursor-default"
                    : "bg-primary hover:bg-red-700 hover:scale-105"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Watchlist</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>{adding ? "Adding..." : "Add to Watchlist"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
