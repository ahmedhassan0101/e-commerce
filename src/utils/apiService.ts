import { AxiosRequestConfig } from "axios";
import axiosInstance, { ApiError } from "./axios";

//! claude.ai ------------------------------------------------------------
// Generic request function
export async function apiRequest<T>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.request<T>(config);
    return response as T;
  } catch (error) {
    throw error as ApiError;
  }
}

// Example typed API functions
export async function getUserById(id: string): Promise<User> {
  return apiRequest<User>({ method: "GET", url: `/users/${id}` });

}

export async function createNewUser(userData: CreateUserData): Promise<User> {
  return apiRequest<User>({ method: "POST", url: "/users", data: userData });

}

// Example types (replace with your actual types)
export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

// ------------------------------------------
// import { getUserById, createUser, User, CreateUserData } from '@/lib/axios';

// // In an API route or server component
// export async function GET(req: Request) {
//   try {
//     const user = await getUserById('someUserId');
//     return new Response(JSON.stringify(user), { status: 200 });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch user' }), { status: 500 });
//   }
// }

// // In a client component
// 'use client';

// import { useState } from 'react';
// import { createUser, User } from '@/lib/axios';

// export default function CreateUserForm() {
//   const [user, setUser] = useState<User | null>(null);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const userData: CreateUserData = {
//       name: formData.get('name') as string,
//       email: formData.get('email') as string,
//       password: formData.get('password') as string,
//     };

//     try {
//       const newUser = await createUser(userData);
//       setUser(newUser);
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   };

//   // Render form and user data...
// }
//! claude.ai ------------------------------------------------------------

// ? ---------------------------------------------------------------------

//! chat GPT ------------------------------------------------------------

interface UserResponse {
  _id: string;
  name: string;
  email: string;
}

// Example function to get user data
export const getUserData = async (userId: string): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get<UserResponse>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error}`);
  }
};

// Example function to create a new user
export const createUser = async (userData: Record<string, unknown>) => {
  try {
    const response = await axiosInstance.post("/users", userData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
};

// import { getUserData } from "@/lib/apiService";
// import { connectToDatabase } from "@/lib/mongodb";

// export default async function Page() {
//   // Fetch data using axios service
//   const userData = await getUserData("123");

//   // Connect to MongoDB
//   await connectToDatabase();

//   return (
//     <div>
//       <h1>Welcome, {userData.name}</h1>
//     </div>
//   );
// }
//! chat GPT ------------------------------------------------------------
