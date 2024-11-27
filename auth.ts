import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  pages: { 
    error: "/not-authorized",
    signIn: "/login",
    signOut: "/",
    newUser: "/register",
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        //@ts-ignore
        token.lastName = user.lastName;
        token.email = user.email;
        //@ts-ignore
        token.role = user.role;
        //@ts-ignore
        token.isActive = user.isActive;
        //@ts-ignore
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          //@ts-ignore
          lastName: token.lastName as string,
          role: token.role as string,
          isActive: token.isActive as boolean,
          accessToken: token.accessToken as string,
        };
      }
      return session;
    },

    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
  },
});
