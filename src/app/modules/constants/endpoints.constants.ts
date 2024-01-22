const API_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/users/login`,
    REGISTER: `${API_URL}/users`,
  },
  USER: {
    GET_USER_DATA: `${API_URL}/users/:id`,
    GET_USERS: `${API_URL}/users`,
  },
  UPLOAD_FILE: {
    UPLOAD_USER_IMAGE: `${API_URL}/images/userProfile`,
    GET_USER_IMAGE: `${API_URL}/images/userProfile/:id`,
  },
  FOLLOWERS: {
    GET_USER_FOLLOWERS: `${API_URL}/followers`,
  },
  POSTS: {
    GET_USER_POSTS: `${API_URL}/posts/user/:id`,
  },
};
