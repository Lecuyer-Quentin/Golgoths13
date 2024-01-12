import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { GithubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { GoogleProfile } from 'next-auth/providers/google'
import { Providers } from '@/app/providers'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                return {
                    ...profile,
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: profile.role || 'user',

                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email: ", type: "text", placeholder: "Enter your email" },
                password: {  label: "Password: ", type: "password", placeholder: "***********" }
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                // You can also use the `req` object to obtain additional parameters

                const user = { id: '1', email: 'quentin.lecuyer@test.com', password: 'test', role: 'admin', name: 'Quentin Lecuyer' }
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null or false then the credentials will be rejected
                    return null
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }
            }

        }),
           
    ],
    pages: {
       // signIn: '/page/auth/login',
     
    },
    callbacks: {
        async jwt(parameters) {
            const { token, user } = parameters
            if (user) token.role = user.role
            return Promise.resolve(token)
        },
        async session(parameters) {
            const { session, token } = parameters
            if (session) session.role = token.role
            return Promise.resolve(session)
        },
        async signIn(parameters) {
            const { user, account, profile, email, credentials } = parameters

            if (account?.provider === 'google') {
                user.name = (profile as GoogleProfile).name
                user.image = (profile as GoogleProfile).picture
                user.role = 'user'
                try{
                    const res = await fetch(`${process.env.API_URL}/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    })
                    const data = await res.json()
                    console.log('data', data)

                }   catch (error) {
                    console.log('error', error)
                }
            }
            if(account?.provider === 'github'){
                user.name = (profile as GithubProfile).name
                user.image = (profile as GithubProfile).avatar_url
                user.role = 'user'
                try{
                    const res = await fetch(`${process.env.API_URL}/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    })
                    const data = await res.json()
                    console.log('data', data)
                }  catch (error) {
                    console.log('error', error)
                }
            }

            if(account?.provider === 'credentials'){
                //user.email = credentials.email
                //user.role = 'user'
                try{
                    const res = await fetch(`${process.env.API_URL}/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    })
                    const data = await res.json()
                    console.log('data', data)

                }  catch (error) {
                    console.log('error', error)
                }
            }
            return Promise.resolve(true)
        }
    },
    }
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/schemas/adapters
    // database: process.env.DATABASE_URL,
    // database: {
    //     type: 'mongodb',
    //     url: process.env.DATABASE_URL,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     ssl: true,
    //     retryWrites: true,
    // },
    

export default options

