import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/users';

const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Add other user-related API functions as needed

export { loginUser, createUser, getUserById };
