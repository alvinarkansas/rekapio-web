import axios from "axios";
import store from "../store";

export const AUTH_API = axios.create({
  baseURL: "https://still-meadow-95330.herokuapp.com/users",
  withCredentials: true,
});

export const API = axios.create({
  baseURL: "https://still-meadow-95330.herokuapp.com",
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
