'use client'

import { getSortedUsers } from '@/libs/users';
import { useEffect, useState } from 'react'
import { User } from '../../../../../../types';
import UserItem from './userItem/userItem';


export default function UsersList() {
    const [allUsersData, setAllUsersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setLoading(true);
        getSortedUsers()
        .then((users) => {
            setAllUsersData(users);
            setLoading(false);
        })
        .catch((e) => {
            setError(e);
            setLoading(false);
        })
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const renderUsers = allUsersData.map((user : User) => {
        return (
            <li key={user._id} className='flex flex-row justify-between mx-4'>
                <UserItem user={user} />
            </li>
        )}
    );

    const renderUsersList = (
        <ul className='flex flex-col space-y-4 mt-4 border-2 border-gray-200 mx-4'>
            {renderUsers}
        </ul>
    );

  return renderUsersList;
}