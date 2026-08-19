import axios from "axios";

// Automatically uses /api on Vercel and http://localhost:5000/api during local development
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000
});

export const getProducts = (params = {}) => api.get("/products", { params });
export const getFeaturedProducts = () => api.get("/products/meta/featured");
export const getBestsellers = () => api.get("/products/meta/bestsellers");
export const getProductById = (id) => api.get(`/products/${id}`);
export const placeOrder = (payload) => api.post("/orders", payload);
export const trackOrder = (trackingId) => api.get(`/orders/${trackingId}`);
export const sendContactMessage = (payload) => api.post("/contact", payload);
export const subscribeToPlan = (payload) => api.post("/subscribe", payload);

export default api;