import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
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
      session.user = {
        //@ts-ignore
        id: token.id,
        name: token.name,
        lastName: token.lastName,
        //@ts-ignore
        email: token.email,
        role: token.role,
        isActive: token.isActive,
      };
      //@ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },

    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
