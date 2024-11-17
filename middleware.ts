// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define la clave secreta de JWT usada por NextAuth (asegúrate de definir NEXTAUTH_SECRET en tu .env)
const secret = process.env.AUTH_SECRET;
if (!secret) {
  throw new Error(
    "JWT secret is missing. Please define AUTH_SECRET in your .env file."
  );
}

export async function middleware(request: NextRequest) {
  const protectedPath = "/admin";

  // Verificar si la ruta solicitada comienza con `/admin`
  if (request.nextUrl.pathname.startsWith(protectedPath)) {
    // Obtener la sesión del usuario a través del token de NextAuth
    const session = await getToken({ req: request, secret });
    // console.log(JSON.stringify(session, null, 2)); // convierte el objeto a una cadena legible

    // Si no hay sesión, redirigir al usuario a la página de login
    if (!session) {
      console.log("No session found. Redirecting to login.");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verificar si el usuario tiene el rol de "admin"
    //@ts-expect-error: Error en la validación de tipos
    if (session?.user?.user?.role !== "ADMIN") {
      console.log("User is not authorized. Redirecting to not-authorized.");

      return NextResponse.redirect(new URL("/not-authorized", request.url));
    }
  }

  // Permitir el acceso a las demás rutas
  return NextResponse.next();
}

// Configuración de rutas en las que debe aplicarse el middleware
export const config = {
  matcher: ["/admin/:path*"], // Aplica el middleware a `/admin` y todas sus subrutas
};
