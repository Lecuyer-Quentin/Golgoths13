import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { GithubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'


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
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email: ", type: "text", placeholder: "Enter your email" },
                password: {  label: "Password: ", type: "password", placeholder: "***********" }
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                // You can also use the `req` object to obtain additional parameters

                const user = { id: '1', email: 'quentin.lecuyer@mailfence.com', password: 'test', role: 'admin', name: 'Quentin Lecuyer' }
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
    // signIn: '/auth/login',
       // signOut: '/auth/logout',
       // error: '/auth/error', // Error code passed in query string as ?error=
       // verifyRequest: '/auth/verify-request', // (used for check email message)
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
            console.log('session callback', session)
            console.log('token callback', token)
            console.log('parameters callback', parameters)
            console.log('session role', session.role)
            console.log('token role', token.role)
            return Promise.resolve(session)
        },
    },
 //   callbacks: {
    //    async jwt(token, user) {
     //       if (user) token.role = user.role
     //       return token
     //   },
     //   async session(session, token) {
     //       if(session.user) session.user.role = token.role
     //   },
  //  },
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

