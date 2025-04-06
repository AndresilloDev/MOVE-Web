import axios from "axios";

const API_BASE_URL = "http://move-api-env.eba-jjywtyd3.us-east-1.elasticbeanstalk.com/api";
//const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default api;
