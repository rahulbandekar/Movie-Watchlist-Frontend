import React, { useState, useEffect } from "react";
import {
  getUserWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from "../services/watchlistService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  List,
  Clock,
  Play,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Star,
} from "lucide-react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/watchlist" } });
      return;
    }
    fetchWatchlist();
  }, [user, navigate]);

  const fetchWatchlist = async () => {
    try {
      const result = await getUserWatchlist();
      console.log("Fetch watchlist result:", result);
      
      if (result.success) {
        // result.data is now the array of watchlist items
        setWatchlist(result.data || []);
        console.log("Watchlist items:", result.data);
      } else {
        console.error("Failed to fetch:", result.message);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const result = await updateWatchlistItem(id, { status: newStatus });
    if (result.success) {
      fetchWatchlist();
    }
  };

  const handleRatingUpdate = async (id) => {
    const rating = parseInt(editRating);
    if (rating >= 1 && rating <= 10) {
      const result = await updateWatchlistItem(id, { rating });
      if (result.success) {
        fetchWatchlist();
        setEditingId(null);
        setEditRating("");
      }
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm("Remove this movie from your watchlist?")) {
      const result = await removeFromWatchlist(id);
      if (result.success) {
        fetchWatchlist();
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PLANNED":
        return <Clock className="w-4 h-4" />;
      case "WATCHING":
        return <Play className="w-4 h-4" />;
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4" />;
      case "DROPPED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <List className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PLANNED":
        return "bg-blue-500/20 text-blue-400 border-blue-500";
      case "WATCHING":
        return "bg-orange-500/20 text-orange-400 border-orange-500";
      case "COMPLETED":
        return "bg-green-500/20 text-green-400 border-green-500";
      case "DROPPED":
        return "bg-red-500/20 text-red-400 border-red-500";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <List className="w-16 h-16 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Loading your watchlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
            My Watchlist
          </h1>
          <p className="text-gray-400 text-lg">
            {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} in
            your collection
          </p>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl">
            <List className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">
              Your watchlist is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Start adding movies to keep track of what you want to watch
            </p>
            <button
              onClick={() => navigate("/")}
              className="btn-primary inline-flex"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Movie Poster */}
                  {item.movie.posterUrl && (
                    <img
                      src={item.movie.posterUrl}
                      alt={item.movie.title}
                      className="w-32 h-48 object-cover rounded-lg"
                    />
                  )}

                  {/* Movie Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.movie.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {item.movie.releaseYear}
                    </p>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {item.movie.overview}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.movie.genres?.map((genre, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-400"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Status and Rating */}
                    <div className="flex flex-wrap items-center gap-4">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusUpdate(item.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(
                          item.status
                        )} focus:outline-none focus:ring-2 focus:ring-primary`}
                      >
                        <option value="PLANNED">Planned</option>
                        <option value="WATCHING">Watching</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="DROPPED">Dropped</option>
                      </select>

                      {editingId === item.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={editRating}
                            onChange={(e) => setEditRating(e.target.value)}
                            className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                            placeholder="1-10"
                          />
                          <button
                            onClick={() => handleRatingUpdate(item.id)}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-300">
                              {item.rating ? `${item.rating}/10` : "Not rated"}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setEditingId(item.id);
                              setEditRating(item.rating || "");
                            }}
                            className="text-gray-400 hover:text-primary transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-600 transition-colors self-start"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
