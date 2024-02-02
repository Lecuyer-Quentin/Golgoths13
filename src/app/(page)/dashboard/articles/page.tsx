import ArticlesList from '@/app/ui/dashboard/articles/articlesList'
import AddArticle from '@/app/features/article/addArticle'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Loading from '@/app/loading'

export const metadata: Metadata = {
  title: 'Dashboard: Articles',
  description: 'Dashboard admin articles',
}


export default function ArticlesPage(){

  return (
    <>
      <div className="flex items-center justify-between mx-4 mt-4 mb-4">
        <h2 className="text-2xl font-bold">Articles</h2>
        <AddArticle />
      </div>
        <ArticlesList />
    </>
  )
}
