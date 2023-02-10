import NextAuth from "@/types/next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: number
            username: string
            email: string
            fullname: string
            role:  string
            address: string
        }
    }

    interface User {
        token: string,
        user: any
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        access_token?:string
        user?: any
    }
}