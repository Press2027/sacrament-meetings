import { auth } from "@/auth";

export const proxy = auth((request) => {
  const isAuthenticated = Boolean(request.auth?.user);

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.nextUrl.origin);

    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname
    );

    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    "/meetings/new/:path*",
    "/meetings/:id/edit/:path*",
  ],
};
