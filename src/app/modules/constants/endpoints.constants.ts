const API_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/users/login`,
  },
  USER: {
    GET_USER_DATA: `${API_URL}/users/:id`,
    GET_USERS: `${API_URL}/users`,
  },
};
