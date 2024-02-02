import { getSortedArticlesData } from '@/libs/articles'
import ArticlesList from '../../ui/articles/articlesList'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Loading from '../../loading'


export const metadata: Metadata = {
  title: 'Tous les articles',
  description: 'Articles du site',
}

export default function ArticlesPage(){
//
//const getData = async () => {
//  'use server'
//  try {
//    const articlesData = await getSortedArticlesData()
//      return articlesData
//  } catch (error) {
//      return error
//  }
//}
//
//const data = await getData()
//const error = data instanceof Error ? data : null

  return (
    <main className='flex flex-col w-full h-full px-20 py-10 min-h-screen'>
        <h1>Tous les articles</h1>
        <section className="w-full h-auto py-10">

            <ArticlesList />
          
        </section>
    </main>
  )
}
