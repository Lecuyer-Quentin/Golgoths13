import UsersList from '@/app/ui/dashboard/users/usersList'

export default function UsersPage() {
  return (
    <>
    <header className="flex items-center justify-between mx-4 mt-4">
      <h2 className="text-2xl font-bold">Users</h2>
    </header>
    <UsersList />
  </>
  )
}
