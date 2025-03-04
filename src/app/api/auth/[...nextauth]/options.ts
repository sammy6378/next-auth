import type { NextAuthOptions } from 'next-auth'
import Github from 'next-auth/providers/github'
import CredentialsProvider  from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                username: { label: "Username", type: "text",placeholder:"Enter your username" },
                password: { label: "Password", type: "password",placeholder:"Enter your password" }
            },
            async authorize(credentials){
                const user = { id: "47", username: "admin", password: "nextauth" };
                if(credentials?.username === user.username && credentials?.password === user.password){
                    return user;
                }else{
                    return null;
                }
            }
        })
    ],
    pages:{
        signIn: "/user/login"
    },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,  
}