'use client'

import { getSortedUsers } from '@/libs/users';
import { useEffect, useState } from 'react'
import { User } from '../../../../../../types';
import UserItem from './userItem/userItem';


export default function UsersList() {

    const [allUsersData, setAllUsersData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSortedUsers();
            setAllUsersData(data);
        };
        fetchData();
    }, []);

  return (
    <ul className='flex flex-col space-y-4 mt-4 border-2 border-gray-200 mx-4'>
        {allUsersData.map((user : User)=> (
            <div key={user._id} className='flex flex-row justify-between mx-4'>
                <UserItem user={user} />
            </div>
        ))}
    
</ul>
  )
}