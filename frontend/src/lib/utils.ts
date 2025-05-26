import { clsx, type ClassValue } from "clsx";
import { signIn } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import { SignInPayload } from "../types/auth/login";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const formatUSD = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F",];
const getCharacter = (index: number) => {
  return hexCharacters[index];
};

export const generateRandomColor = () => {
  let hexColorPrefix = "#";
  for (let index = 0; index < 6; index++) {
    const randomPosition = Math.floor(Math.random() * hexCharacters.length);
    hexColorPrefix += getCharacter(randomPosition);
  }
  return hexColorPrefix;
};