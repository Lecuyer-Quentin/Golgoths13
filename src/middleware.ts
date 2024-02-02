import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // augment the Request object with the user's token
    function middleware(req: NextRequestWithAuth) {
        //console.log('middleware', req.nextUrl.pathname)
        //console.log('middleware', req.nextauth.token)

        // only admin/editor users can access the dashboard
        if(req.nextUrl.pathname.startsWith('/dashboard')
            && req.nextauth.token?.role !== 'admin'
            && req.nextauth.token?.role !== 'editor'
        ) {
            return NextResponse.rewrite(
                new URL ('/denied', req.url)
            )
        }
        if(req.nextUrl.pathname.startsWith('/users')
            && req.nextauth.token?.role !== 'admin'
            && req.nextauth.token?.role !== 'editor'
            && req.nextauth.token?.role !== 'user'
        ) {
            return NextResponse.rewrite(
                new URL ('/denied', req.url)
            )
        }
    },
      
    {
        callbacks: {
            authorized: ({token}) =>  !!token
        },

    }
)

// Protected routes
export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/articles',
        '/dashboard/users',
        '/dashboard/teams',
        '/dashboard/settings',
        '/dashboard/help',
        '/users',

    ],
}