import axios from "axios";
const getEnv = import.meta.env.VITE_APP_BASE_API; 

const api = axios.create({
  baseURL: getEnv ,
  headers: { "Content-Type": "application/json" },
});

export const axiosWithCredentials = axios.create({
  baseURL: getEnv,
  withCredentials: true,
});

export const getDestinationById = async (id) => {
  return api.get(`/api/destination/getDestinationById/${id}`);
};

export default api;

// https://7wvxgkc8-8000.inc1.devtunnels.ms
// https://begin-yatra-nq40.onrender.com
