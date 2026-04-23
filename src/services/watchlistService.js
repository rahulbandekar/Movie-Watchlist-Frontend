import api from './api';

export const addToWatchlist = async (watchlistData) => {
  try {
    const response = await api.post('/watchlist', watchlistData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to add to watchlist' 
    };
  }
};

export const getUserWatchlist = async () => {
  try {
    const response = await api.get('/watchlist');
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch watchlist' 
    };
  }
};

export const removeFromWatchlist = async (id) => {
  try {
    await api.delete(`/watchlist/${id}`);
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to remove from watchlist' 
    };
  }
};

export const updateWatchlistItem = async (id, updateData) => {
  try {
    const response = await api.put(`/watchlist/${id}`, updateData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to update watchlist item' 
    };
  }
};