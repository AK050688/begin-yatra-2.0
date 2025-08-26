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

// New function to fetch leads with filters
export const fetchLeads = async (filters) => {
  const { search, destination, city, tripType, satatus, leadType, page, limit } = filters;
  const response = await api.get(`/api/leads`, {
    params: {
      search,
      destination,
      city,
      tripType,
      satatus,
      leadType,
      page,
      limit,
    },
  });
  return response;
};

export default api;
