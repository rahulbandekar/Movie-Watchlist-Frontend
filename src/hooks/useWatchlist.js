import { useState, useEffect } from 'react';
import { getUserWatchlist } from '../services/watchlistService';
import { useAuth } from '../contexts/AuthContext';

export const useWatchlist = () => {
  const { user } = useAuth();
  const [watchlistIds, setWatchlistIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWatchlistIds(new Set());
      setLoading(false);
      return;
    }

    const fetchWatchlist = async () => {
      const result = await getUserWatchlist();
      if (result.success) {
        const ids = new Set(result.data.data.map(item => item.movieId));
        setWatchlistIds(ids);
      }
      setLoading(false);
    };

    fetchWatchlist();
  }, [user]);

  const isInWatchlist = (movieId) => watchlistIds.has(movieId);

  return { isInWatchlist, loading };
};