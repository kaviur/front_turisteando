"use client";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

export function ClientProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const { data: session, status } = useSession();

  // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
  const token = session?.user?.accessToken;

  useEffect(() => {
    const checkTokenValidity = () => {
      if (token) {
        try {
          const { exp } = jwtDecode(token);
          if (exp) {
            if (Date.now() >= exp * 1000) {
              console.warn("Token expirado. Cerrando sesión.");
              signOut();
            }
          }
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          signOut();
        }
      }
    };

    if (status === "authenticated") {
      checkTokenValidity();
    }
  }, [status, token]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
