import { clsx, type ClassValue } from "clsx"
import { signIn } from "next-auth/react";
import { twMerge } from "tailwind-merge"
import { SignInPayload } from "../types/auth/login";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = () => {
      reject(new Error("Failed to convert file to Base64."));
    };

    reader.readAsDataURL(file);
  });
};

export const loggingInUser = async (payload: SignInPayload) => {
  return await signIn("credentials", payload);
};
