import axios, { AxiosError, isAxiosError } from "axios";
import { getItemLocalStorage } from ".";
import { API_URL, AuthKeys } from "@/configs";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common['Accept'] = 'application/json';

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

export const getConfigsWithAccessToken = () => {
  const accessToken = getItemLocalStorage(AuthKeys.ACCESS_TOKEN);
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const handleError = (error: AxiosError | any) => {
  if (isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;
      console.log("Status code:", status);
      console.log("Data:", data);
    } else {
      console.log("Error:", error.message);
    }
  } else {
    console.log("Error:", error.message);
  }
};

export default api;