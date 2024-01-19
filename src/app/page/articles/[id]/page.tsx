
import ArticleDetails from '@/app/ui/articles/articleDetails/articleDetails'
import { getArticleDataById, getSortedArticlesData } from '@/libs/articles'
import { Article } from '../../../../../types'


export async function generateMetadata ({ params }: { params: { id: string } }): Promise<{ title: string, description: string }> {
  const article = await getArticleDataById(params.id as string)
  if (!article) return { title: 'Article not found', description: 'Article not found' }
  return {
    title: article.title,
    description: article.description
  }
}

export async function generateStaticProps({params}: { params: { id: string}}){
  const articleData = await getArticleDataById(params.id as string)
  return{
    props:{
      articleData
    }
  }
}

type Props = {
  articleData: Article
  params: { id: string }
}


export default async function ArticlePage ({ articleData, params }: Props) {

  const getData = async () => {
    'use server'
    try {
      const articleData = await getArticleDataById(params.id as string)
        return articleData
    } catch (error) {
        return error
    }
  }

  const data = await getData()
  const error = data instanceof Error ? data : null

  return (
    <main className='flex flex-col w-full h-full px-20 py-10 min-h-screen justify-center items-center'>
        <ArticleDetails data={data} error={error} reset={getData} />
    </main>

  )
}

