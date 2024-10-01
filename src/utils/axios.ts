import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Define your API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

// Define custom error type
export interface ApiError extends Error {
  status?: number;
  data?: any;
}

// Create a custom Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor (e.g., to add auth token)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;

    const token = localStorage.getItem("accessToken");
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (e.g., to handle errors globally)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const customError: ApiError = new Error(
      (error.response?.data as any)?.message || "An unexpected error occurred"
    );
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    return Promise.reject(customError);
  }
);

export default axiosInstance;
