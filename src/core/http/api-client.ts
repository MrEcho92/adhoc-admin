import axios, { InternalAxiosRequestConfig } from "axios";
import { envVariables } from "../../constants";

export const getBaseURL = (key: string) => {
  const apiURL = process.env[key];
  if (!apiURL) throw new Error("missing base API url");
  return apiURL || "";
};

export const HTTPInstance = axios.create({
  baseURL: getBaseURL(envVariables.localEnv.apiURL),
  headers: {
    "Content-Type": "application/json",
  },
});

HTTPInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  return config;
});

HTTPInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data.message || error.message;
    // use Notification e.g. snackbar
    return Promise.reject(error);
  },
);
