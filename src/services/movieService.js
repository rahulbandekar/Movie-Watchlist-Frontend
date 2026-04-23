import api from './api';

export const getAllMovies = async () => {
  try {
    const response = await api.get('/movies');
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch movies' 
    };
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await api.get(`/movies/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Movie not found' 
    };
  }
};