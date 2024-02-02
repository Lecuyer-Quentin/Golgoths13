import type { NextAuthOptions, User } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { GithubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { GoogleProfile } from 'next-auth/providers/google'
import { fetchToSignIn, fetchToSignUp, fetchToSignUpWithGoogle } from '@/libs/auth'
import { getUserData } from '@/libs/users'

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

                const res = await fetchToSignUp(credentials as { email: string, password: string })
                const user = res.user
                if (user) {
                    //console.log('usertoTEst', user)
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
       // signIn: '/page/auth/login',
     
    },
    callbacks: {
        async jwt(parameters) {
            const { token, user } = parameters
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return Promise.resolve(token)
        },
        async session(parameters) {
            const { session, token } = parameters
            if (token) {
                session.role = token.role
                session.user = token
                session.id = token.id
            }
            return Promise.resolve(session)
        },
        async signIn(parameters) {
            const { user, account, profile, email, credentials } = parameters

            if (account?.provider === 'google') {
                user.name = (profile as GoogleProfile).name
                user.image = (profile as GoogleProfile).picture
                user.email = (profile as GoogleProfile).email
                user.role = (profile as GoogleProfile).role || 'user'
                user.id = (profile as GoogleProfile).sub
                
                const existingUser = await getUserData(user.id)
                console.log('existingUser', existingUser)
                //todo add update to db
                if (!existingUser) {
                    await fetchToSignUpWithGoogle(user)
                    console.log('added user', user)
                } else {
                    console.log('user exists', user)
                }
            }

            if(account?.provider === 'github'){
                user.name = (profile as GithubProfile).name
                user.image = (profile as GithubProfile).avatar_url
                user.email = (profile as GithubProfile).email
                user.role = (profile as GithubProfile).role || 'user'
                user.id = (profile as GithubProfile).id.toString()
                fetchToSignIn(user)
            }

            if(account?.provider === 'credentials'){
                //fetchToSignIn(user)
                try {
                    const res = await fetch(`${process.env.API_URL}/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(credentials),
                    })
                    const data = await res.json()
                    //console.log('data', data)
                    if (data.user) {
                        user.role = data.user.role
                        user.id = data.user._id
                    }
                } catch (error) {
                    console.log('error', error)
                }

            }
            return Promise.resolve(true)
        }
    },
    }

export default options

