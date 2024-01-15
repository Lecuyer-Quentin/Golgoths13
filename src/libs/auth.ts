
import { User } from "next-auth"

export async function fetchToSignIn( user : User ){
    try{
        const res = await fetch(`${process.env.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log('error', error)
    }
}


export async function fetchToSignUp( credentials : { email: string, password: string }){
    try{
        const res = await fetch(`${process.env.API_URL}/users/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log('error', error)
    }
}    


