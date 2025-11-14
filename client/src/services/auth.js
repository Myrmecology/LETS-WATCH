import api from './api';

// Register user
export const registerAPI = async (username, email, password) => {
  const response = await api.post('/api/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};

// Login user
export const loginAPI = async (email, password) => {
  const response = await api.post('/api/auth/login', {
    email,
    password,
  });
  return response.data;
};

// Get user profile
export const getUserProfileAPI = async (token) => {
  const response = await api.get('/api/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};