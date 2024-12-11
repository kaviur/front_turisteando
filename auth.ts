import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { authConfig } from "./auth.config";

async function getUser(email: string, password: string): Promise<any> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    const userJson = await res.json();
    return userJson.data;
  } catch (error) {
    console.error("Error fetching user from API:", error);
    return null;
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const result = await getUser(
          credentials.email as string,
          credentials.password as string
        );
        return result && result.user
          ? {
              id: result.user.id,
              name: result.user.name,
              lastName: result.user.lastName,
              email: result.user.email,
              role: result.user.role,
              accessToken: result.accessToken,
              isActive: result.user.isActive,
            }
          : null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
