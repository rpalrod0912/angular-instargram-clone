// const API_URL = 'http://localhost:3000/api';
const API_URL = 'https://express-typescript-api.onrender.com/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/users/login`,
    REGISTER: `${API_URL}/users`,
  },
  USER: {
    GET_USER_DATA: `${API_URL}/users/:id`,
    GET_USERS: `${API_URL}/users`,
    UPDATE_IMAGE: `${API_URL}/users/updateImage/:id`,
  },
  UPLOAD_FILE: {
    UPLOAD_USER_IMAGE: `${API_URL}/images/userProfile`,
    GET_USER_IMAGE: `${API_URL}/images/userProfile/:id`,
  },
  FOLLOWERS: {
    GET_USER_FOLLOWERS: `${API_URL}/followers`,
    GET_FOLLOWERS_DETAIL: `${API_URL}/followers/followerDetail`,
    // /followers/followedDetail?userId=3
    GET_FOLLOWEDS_DETAIL: `${API_URL}/followers/followedDetail`,
  },
  POSTS: {
    GET_ALL_POST: `${API_URL}/posts`,
    GET_USER_POSTS: `${API_URL}/posts/user/:id`,
    UPLOAD_NEW_POST: `${API_URL}/posts`,
  },
};
