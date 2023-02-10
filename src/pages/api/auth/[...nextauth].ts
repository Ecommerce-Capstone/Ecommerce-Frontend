import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    secret: "secret",
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            // @ts-ignore
            async authorize(credentials, req) {

                // const response = await axios.post('http://localhost:8080/login', {
                //     username: credentials.username,
                //     password:  credentials.password
                // }).catch(err => {
                //     console.log("error >> ", err)
                //     throw new Error('Invalid credentials');
                // });
                const response = {
                    data: {
                        data: {
                            token_type: "Bearer",
                            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjc2MDQ4NjgxLCJpYXQiOjE2NzYwMTI2ODEsInVzZXJuYW1lIjoiYWRtaW4ifQ.k8GCYQA1Yf96jz9QxVECepQXzlTLyeNqVhWahuNZIpg",
                            expired_in: 3600,
                            user: {
                                id: 4,
                                username: "username",
                                fullname: "Nellie Kiehn MD",
                                email: "Rene_Beer@yahoo.com",
                                photo: "http://placeimg.com/640/480",
                                role: "admin",
                                address: "8887 Reagan Locks",
                            }
                        }
                    }
                }

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
        signIn: '/auth/signin'
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
            return session
        }
    }
}

export default NextAuth(authOptions)
