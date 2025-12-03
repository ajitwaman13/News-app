import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: "http://10.0.2.2:3000",
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  console.log("axios token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
    console.log("No token found, Authorization header removed.");
  }
  return config;
});

export default api;
