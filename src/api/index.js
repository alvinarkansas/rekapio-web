import axios from "axios";
import store from "../store";

// const baseURL = "http://localhost:3000";
const baseURL = "https://still-meadow-95330.herokuapp.com";

export const AUTH_API = axios.create({
  baseURL: baseURL + "/users",
  withCredentials: true,
});

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    config.headers.authorization = store.state.token;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
