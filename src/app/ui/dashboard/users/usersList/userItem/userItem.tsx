import React from 'react'
import { User } from '../../../../../../../types'

type Props = {
    user: User
}

export default function UserItem({user} : Props) {
    const {email} = user
  return (
    <li className='flex flex-row'>
        <p>{email}</p>
    </li>
  )
}
