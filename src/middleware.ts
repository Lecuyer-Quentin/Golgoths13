import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // augment the Request object with the user's token
    function middleware(req: NextRequestWithAuth) {
        //console.log('middleware', req.nextUrl.pathname)
        //console.log('middleware', req.nextauth.token)

        // only admin/editor users can access the dashboard
        if(req.nextUrl.pathname.startsWith('/page/dashboard')
            && req.nextauth.token?.role !== 'admin'
            && req.nextauth.token?.role !== 'editor'
        ) {
            return NextResponse.rewrite(
                new URL ('/page/denied', req.url)
            )
        }
        if(req.nextUrl.pathname.startsWith('/page/profile')
            && req.nextauth.token?.role !== 'admin'
            && req.nextauth.token?.role !== 'editor'
            && req.nextauth.token?.role !== 'user'
        ) {
            return NextResponse.rewrite(
                new URL ('/page/denied', req.url)
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
        '/page/dashboard',
        '/page/dashboard/articles',
        '/page/dashboard/users',
        '/page/dashboard/teams',
        '/page/dashboard/settings',
        '/page/dashboard/help',
        '/page/profile',

    ],
}