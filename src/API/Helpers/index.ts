import axios from "axios";

const api = axios.create({
  baseURL:
    "https://iha-backend.herokuapp.com/api" || process.env.REACT_APP_API_URL,
});

export const get = async (url: string, config?: any) => {
  return await api
    .get(url, { ...config } || {})
    .then((response) => response.data);
};

export const post = async (url: string, data?: any, config?: any) => {
  return api
    .post(url, data, { ...config } || {})
    .then((response) => response.data);
};

export default api;
