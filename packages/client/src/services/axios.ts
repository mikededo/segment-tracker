import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
});

// `err.response` is the only prop wanted on error
instance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err.response.data)
);

export default instance;
