import axios from "axios";

export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000
});

export const getProducts = (params = {}) =>
  api.get("/api/products", { params });

export const getFeaturedProducts = () =>
  api.get("/api/products/meta/featured");

export const getBestsellers = () =>
  api.get("/api/products/meta/bestsellers");

export const getProductById = (id) =>
  api.get(`/api/products/${id}`);

export const placeOrder = (payload) =>
  api.post("/api/orders", payload);

export const trackOrder = (trackingId) =>
  api.get(`/api/orders/${trackingId}`);

export const sendContactMessage = (payload) =>
  api.post("/api/contact", payload);

export const subscribeToPlan = (payload) =>
  api.post("/api/subscribe", payload);

export default api;