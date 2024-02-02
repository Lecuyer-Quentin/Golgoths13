'use client'

import { useState, useEffect } from 'react'
import { User } from '../../../../../types'
import Error from '../../../utils/error/error'
import Image from 'next/image'
import { getUserData } from '@/libs/users'
import { useCallback } from 'react'



type Props = {
    id : string
    }

export default function UserDetails({ id }: Props) {

    const [data, setData] = useState<User | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const getUser = useCallback(async () => {
        try {
            const data = await getUserData(id)
            return data
        } catch (error) {
            return error
        }
    }
    , [ id ])


    useEffect(() => {
        getUser()
        .then((data) => {
            setData(data)
        })
        .catch((error) => {
            setError(error as Error)
        })
        .finally(() => {
            setLoading(false)
        })
    }
    , [ error, getUser ])

    if (!data) return null
    const { name, lastName, username, email, role, avatar } = data as User
    const renderAvatar = () => {
        return (
            <Image src={avatar} alt={name} width={200} height={200} />
        )
    }

    const renderUserDetails = () => {
        return (
            <article className='flex flex-col w-full h-full'>
                <div className='flex flex-col w-full h-full'>
                    <h1>{name}</h1>
                    <p>{lastName}</p>
                    <p>{username}</p>
                    <p>{email}</p>
                    <p>{role}</p>
                </div>
                <div className='flex flex-col w-full h-full'>
                    {avatar && renderAvatar()}
                </div>
            </article>
        )
    }

    if (loading) return <h1>Loading...</h1>
    if (error) return <Error error={error} reset={getUser} />

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
        <h1>User Details</h1>
      {data && renderUserDetails()}
    </div>
  )
}
