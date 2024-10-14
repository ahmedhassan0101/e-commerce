import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// Define custom error type
export interface ApiError {
  success: false;
  message: string;
  status?: number;
  data?: any;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
  status?: number;
}
// Create a custom Axios instance
const axiosInstance: AxiosInstance = axios.create({
  //error Expression expected.ts(1109)

  baseURL: API_BASE_URL,
  // timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (e.g., to handle errors globally)
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response.data;
//   },
//   (error: AxiosError) => {
//     const customError: ApiError = {
//       message:
//         (error.response?.data as any)?.message ||
//         "An unexpected error occurred [from interceptors.response]",
//       status: error.response?.status,
//       data: error.response?.data,
//     };
//     return Promise.reject(customError);
//   }
// );
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    console.error("Interceptor caught error:", error);
    console.error("Error response:", error.response);
    const customError: ApiError = {
      success: false,
      message:
        (error.response?.data as any)?.message ||
        `An unexpected error occurred: ${error.message}`,
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);
export default axiosInstance;

// Generic request function
export async function apiRequest<T>(
  config: AxiosRequestConfig
): Promise<ApiSuccess<T> | ApiError> {
  try {
    const response = await axiosInstance.request<T>(config);
    console.log("apiRequest response", response);
    return {
      success: true,
      data: response.data,
      message: (response as any).message,
      status: response.status,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred [from Generic apiRequest]",
    status: error.response?.status,
    data: error.response?.data,
    };
  }
}
