import { getSortedArticlesData } from '@/libs/articles'
import ArticlesList from '../../ui/articles/articlesList/articlesList'
import type { Metadata } from 'next'
import { Article } from '@../../../types'

export const metadata: Metadata = {
  title: 'Tous les articles',
  description: 'Articles du site',
}

export async function generateStaticProps(){
  const articlesData = await getSortedArticlesData()
  return{
    props:{
      articlesData
    }
  }
}

export default async function ArticlesPage({ articlesData} : {articlesData : Article[]}){

  const getData = async () => {
    'use server'
    try {
      const articlesData = await getSortedArticlesData()
        return articlesData
    } catch (error) {
        return error
    }
  }

  const data = await getData()
  const error = data instanceof Error ? data : null

  return (
    <main className='flex flex-col w-full h-full px-20 py-10 min-h-screen'>
        <h1>Tous les articles</h1>
        <section className="w-full h-auto py-10">
          <ArticlesList data={data} error={error} reset={getData} />
        </section>
    </main>
  )
}
