import { withAuth } from "next-auth/middleware"
const _ = require("lodash")

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            // `/admin` requires admin role
            if (_.includes(req.nextUrl.pathname, "/admin")) {
                return token?.user?.role === "admin"
            }
            // `/me` only requires the user to be logged in
            return !!token
        },
    },
})

export const config = { matcher: ["/admin/:path*", "/me"] }