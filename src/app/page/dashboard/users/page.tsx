
import UsersList from '@/app/ui/dashboard/users/usersList'
import type { Metadata } from 'next'
import { getSortedUsersData } from '@/libs/users'
import { User } from '@../../../types'

export const metadata: Metadata = {
  title: 'Dashboard: Users',
  description: 'Dashboard admin users',
}

export async function generateStaticProps(){
    const usersData = await getSortedUsersData()
    return{
      props:{
        usersData
      }
    }
}

export default async function UsersPage({ usersData} : {usersData : User[]}){

  const getData = async () => {
    'use server'
    try {
      const usersData = await getSortedUsersData()
        return usersData
    } catch (error) {
        return error
    }
  }

  const data = await getData()
  const error = data instanceof Error ? data : null

  
  return (
    <>
    <header className="flex items-center justify-between mx-4 mt-4">
      <h2 className="text-2xl font-bold">Users</h2>
    </header>
    <UsersList data={data} error={error} reset={getData} />
  </>
  )
}
