import { getCsrfToken } from "next-auth/react";

export const addCsrfToken = async (url: string): Promise<string> => {
  const csrfToken = await getCsrfToken();
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}csrf=${csrfToken}`;
};
