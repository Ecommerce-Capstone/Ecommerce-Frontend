import NextAuth from "@/types/next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        access_token?: string
        user: {
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
    interface JWT {
        access_token?:string
        user?: any
    }
}