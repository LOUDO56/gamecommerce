import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_REDIRECT_URL, PUBLIC_ROUTES } from "./routes";
import { getUserByEmail } from "./data/user";


const { auth } = NextAuth(authConfig);

export default auth(async (req)  => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = PUBLIC_ROUTES.some(route =>
      nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if(isApiAuthRoute) {
    return;
  }

  if(isAuthRoute) {
    if(isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl))
    }
    return;
  }

  if(!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;

})
 

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}