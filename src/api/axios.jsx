import axios from "axios";

const api = axios.create({
  baseURL: "https://express-ecommerce-kappa.vercel.app/", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.dispatchEvent(new Event("token-expired"));
    }
    return Promise.reject(err);
  }
);

export default api;
