import NextAuth from 'next-auth';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // Si la ruta es favorites y el usuario no esta autenticado será redirigido al login
  if (nextUrl.pathname.startsWith('/favorites') && !isAuthenticated) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  // Revisar si el usuario tiene rol ADMIN
  //@ts-ignore
  const isAdmin = req.auth?.user?.role === 'ADMIN';

  // Si no está autenticado y la ruta no es pública, redirige a ROOT
  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }

  // Si está autenticado pero no es ADMIN y está en una ruta protegida
  if (isAuthenticated && !isAdmin) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }
});

export const config = {
  matcher: ['/admin','/admin/:path*',  '/favorites', '/favorites/:path*'],
};
