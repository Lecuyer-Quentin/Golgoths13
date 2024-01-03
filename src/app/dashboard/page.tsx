import React from 'react'
import UsersPage from './users/page'
import ArticlesPage from './articles/page'
import TeamsPage from './teams/page'

export default function DashboardPage() {
  return (
    <div className="flex w-full h-full">
      <section className="flex flex-col w-full h-full bg-gray-300">
        <ArticlesPage />
        <UsersPage />
        <TeamsPage />
      </section>
      <section className="flex flex-col w-80 h-full bg-gray-100">
        <p> 
          Right side
        </p>
      </section>
      
    </div>
  )
}
