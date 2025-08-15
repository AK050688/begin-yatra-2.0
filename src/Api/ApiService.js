import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_API;

export const imgApi = `${baseURL}/public/temp/`;

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const axiosWithCredentials = axios.create({
  baseURL,
  withCredentials: true,
});

export const getImageUrl = (image) => {
  if (!image) {
    return;
  }
  return `${baseURL}/public/temp/${image}`;
};

export default api;

// https://7wvxgkc8-8000.inc1.devtunnels.ms
// https://begin-yatra-nq40.onrender.com
