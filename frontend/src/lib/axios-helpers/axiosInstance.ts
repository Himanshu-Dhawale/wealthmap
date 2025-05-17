import axios from "axios";
import { getServerSession } from "next-auth/next";
import { NEXT_AUTH } from "../auth";

const isServer = typeof window === "undefined";

const createAxiosInstance = async (clientToken?: string) => {
  let token: string | undefined;

  if (isServer) {
    const session = await getServerSession(NEXT_AUTH);
    token = session?.user.accessToken;
  } else {
    token = clientToken;
  }

  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers
  });
};


export default createAxiosInstance;
