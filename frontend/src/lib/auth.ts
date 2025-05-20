import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isAxiosError } from "axios";
import { postReq } from "./axios-helpers/apiClient";
import { SIGNIN } from "../endpoints/auth.endpoint";

export const NEXT_AUTH: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your@email.com"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          const payload = {
            email: credentials.email,
            password: credentials.password
          };

          const response = await postReq<{
            token: string;
            user: {
              id: string;
              email: string;
              role: string;
              companyId: string;
            }
          }>(SIGNIN, payload);

          if (!response.data?.token) {
            throw new Error('Invalid response from server');
          }

          return {
            id: response.data.user.id,
            email: response.data.user.email,
            token: response.data.token,
            role: response.data.user.role,
            companyId: response.data.user.companyId
          };
        } catch (err) {
          if (isAxiosError(err)) {
            const errorMessage = err.response?.data?.message || 'Authentication failed';
            if (err.response?.status === 401) {
              throw new Error('Invalid credentials');
            }
            throw new Error(errorMessage);
          }
          throw new Error('An unexpected error occurred');
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.companyId = user.companyId;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.companyId = token.companyId;
      session.user.accessToken = token.accessToken || token.id;
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
};