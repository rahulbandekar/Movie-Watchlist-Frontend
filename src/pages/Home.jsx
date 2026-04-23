import React, { useState, useEffect } from 'react';
import { getAllMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import { Film, Search, TrendingUp } from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [searchTerm, selectedGenre, movies]);

  const fetchMovies = async () => {
    const result = await getAllMovies();
    if (result.success) {
      setMovies(result.data.data.movies);
      const allGenres = result.data.data.movies.flatMap(m => m.genres || []);
      const uniqueGenres = [...new Set(allGenres)];
      setGenres(uniqueGenres);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const filterMovies = () => {
    let filtered = [...movies];
    
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedGenre) {
      filtered = filtered.filter(m => 
        m.genres?.includes(selectedGenre)
      );
    }
    
    setFilteredMovies(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Film className="w-16 h-16 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Loading amazing movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-900/20 border border-red-500 rounded-lg p-8">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/20 via-secondary to-dark py-16 mb-12">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
              Your Personal Movie Journey
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover, track, and rate movies. Build your ultimate watchlist and never miss a great film.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGenre('')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !selectedGenre
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                All
              </button>
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedGenre === genre
                      ? 'bg-primary text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Stats */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {filteredMovies.length} {filteredMovies.length === 1 ? 'Movie' : 'Movies'}
          </h2>
          <div className="flex items-center space-x-2 text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Latest releases</span>
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No movies found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;