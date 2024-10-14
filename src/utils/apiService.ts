import { AuthData } from "@/app/(auth)/comp/constants";
import { apiRequest } from "./axios";

export interface AuthResponse {
  user: {
    username: string;
    address: {
      active: boolean;
    };
    createdAt: string;
    email: string;
    emailVerified: boolean;
    image: string;
    role: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
}

export const authApi = {
  signUp: (data: AuthData) =>
    apiRequest<AuthResponse>({
      method: "POST",
      url: "/api/auth/signup",
      data,
    }),
  forgotPassword: (data: { email: string }) =>
    apiRequest<{ message: string }>({
      method: "POST",
      url: "/api/auth/forgot-password",
      data,
    }),
  resetPassword: (data: { token: string; password: string }) =>
    apiRequest<{ email: string }>({
      method: "POST",
      url: "/api/auth/reset-password",
      data,
    }),
  // login: (data: AuthData) =>
  //   apiRequest<AuthResponse>({
  //     method: "POST",
  //     url: "/api/auth/login",
  //     data,
  //   }),
};

// Usage example
// async function handleAuth(values: AuthData, isSignUp: boolean) {
//   const apiCall = isSignUp ? authApi.signUp : authApi.login;
//   const result = await apiCall(values);
//   if ('data' in result) {
// Success case
//     console.log(result.message);
//     return result.data;
//   } else {
// Error case
//     console.error(result.message);
// Handle error (e.g., show toast, set form errors, etc.)
//   }
// }
