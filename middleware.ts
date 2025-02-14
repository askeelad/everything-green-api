import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    // console.log(req.cookies);
    // console.log("middleware");
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // as nextauth takes care of jwt nothing to do here
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/api/users/:path*"], // Apply this middleware to the `/api/users/*` route.
};
