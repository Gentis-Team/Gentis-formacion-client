import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_ENDPOINT,
  timeout: 90000,
});

export default http;