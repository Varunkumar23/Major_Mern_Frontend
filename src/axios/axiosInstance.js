import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  timeout: 60000,
  headers: { "X-Custom-Header": "foobar" },
});

export { axiosInstance };
