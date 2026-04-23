import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Registration failed' 
    };
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem("token", response.data.token);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Login failed' 
    };
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Logout failed' };
  }
};

export const checkAuth = async () => {
  try {
    await api.get('/movies');
    return true;
  } catch (error) {
    return false;
  }
};