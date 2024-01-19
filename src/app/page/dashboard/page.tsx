import UsersPage from './users/page'
import ArticlesPage from './articles/page'
import TeamsPage from './teams/page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard admin',
}

export default function DashboardPage() {
  return (
    <main className="flex flex-col w-full h-full lg:flex-row ">
      <section className="flex flex-col w-full h-full bg-white">
        <ArticlesPage />
        <UsersPage />
        <TeamsPage />
      </section>
      <section className="flex flex-col w-80 h-full">
        <p> 
          Right side
        </p>
      </section>
    </main>
  )
}
