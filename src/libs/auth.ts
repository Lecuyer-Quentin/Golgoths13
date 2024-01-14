// todo : 1. change type of parameters

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
        console.log('data', data)
    } catch (error) {
        console.log('error', error)
    }
}


