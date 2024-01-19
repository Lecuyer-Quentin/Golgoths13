import ArticlesList from '@/app/ui/dashboard/articles/articlesList'
import AddArticle from '@/app/features/article/addArticle'
import type { Metadata } from 'next'
import { getSortedArticlesData } from '@/libs/articles'
import { Article } from '@../../../types'

export const metadata: Metadata = {
  title: 'Dashboard: Articles',
  description: 'Dashboard admin articles',
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
    <>
      <div className="flex items-center justify-between mx-4 mt-4 mb-4">
        <h2 className="text-2xl font-bold">Articles</h2>
        <AddArticle />
      </div>
      <ArticlesList data={data} error={error} reset={getData} />
    </>
  )
}
