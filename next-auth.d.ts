import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// TYPE EXTENSIONS FOR NEXT-AUTH 
// Use this file to extend the types of next-auth
// by adding the role property to the user object
// and to the JWT object



declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session extends DefaultSession {
        id: string,
        role: string,
    }

    /**
     * Returned by `getSession`, and received as a prop on the `Provider` React Context
     */
    interface User extends DefaultUser {
        //id: string,
        role: string,

    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string,
    }
}