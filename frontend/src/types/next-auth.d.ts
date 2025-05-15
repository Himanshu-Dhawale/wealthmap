import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      role: string;
      companyId: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    role: string;
    companyId: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    companyId: string;
    accessToken: string;
  }
}