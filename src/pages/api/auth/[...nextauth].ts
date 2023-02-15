import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            // @ts-ignore
            async authorize(credentials, req) {
                const baseURL = process.env.NEXTAUTH_API_URL
                const response = await axios.post(`${baseURL}/login`, {
                    username: credentials?.username,
                    password:  credentials?.password
                }).catch(err => {
                    throw new Error(err.response.data.error ?? err.message);
                });

                const user = response.data.data

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, user, profile, account, isNewUser }) {
            if (user){
                token.access_token = user.token
                token.user = user.user
            }
            return token
        },
        async session({ session, token, user }) {
            session.user = token.user
            session.access_token = token.access_token
            return session
        }
    }
}

export default NextAuth(authOptions)
