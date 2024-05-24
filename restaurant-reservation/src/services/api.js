import axios from 'axios';

const API_URL = 'http://localhost:1970';

const api = axios.create({
  baseURL: API_URL,
});

// User API calls
export const getAllUsers = () => api.get('/users/');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post('/users/', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const loginUser = (username, password) => api.post('/users/login', { username, password });
export const getOwnerById = (id) => api.get(`/owners/${id}`);

//export const register = (userData) => api.post('/auth/register', userData);
//export const login = (username, password) => api.post('/auth/login', { username, password });

// Restaurant API calls
export const getAllRestaurants = () => api.get('/restaurants/');
export const getRestaurantById = (id) => api.get(`/restaurants/${id}`);
export const createRestaurant = (restaurant) => api.post('/restaurants/', restaurant);
export const updateRestaurant = (id, restaurant) => api.put(`/restaurants/${id}`, restaurant);
export const deleteRestaurant = (id) => api.delete(`/restaurants/${id}`);

// Reservation API calls
export const getAllReservations = () => api.get('/reservations/');
export const getReservationById = (id) => api.get(`/reservations/${id}`);
export const createReservation = (reservation) => api.post('/reservations/', reservation);
export const updateReservation = (id, reservation) => api.put(`/reservations/${id}`, reservation);
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);



export const generateOTP = async (username) => {
  try {
    const response = await api.post('/2fa/setup', null, { params: { username } });
    return response.data;
  } catch (error) {
    console.error('Error setting up 2FA:', error.response?.data || error.message);
    throw error.response?.data || new Error('Error setting up 2FA. Please try again later.');
  }
};

export const verifyOTP = async (username, otp) => {
  try {
    const response = await api.post('/2fa/verify', null, { params: { username, otp } });
    return response.data;
  } catch (error) {
    console.error('Error verifying 2FA:', error.response?.data || error.message);
    throw error.response?.data || new Error('Error verifying 2FA. Please try again later.');
  }
};
export default api;
