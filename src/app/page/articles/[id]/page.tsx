
import ArticleDetails from '@/app/ui/articles/articleDetails/articleDetails'
import { getArticleDataById, getSortedArticlesData } from '@/libs/articles'
import { Article } from '../../../../../types'

//todo: correct metadata

export async function generateMetadata ({ params }: { params: { id: string } }): Promise<{ title: string, description: string }> {
  const article = await getArticleDataById(params.id as string)
  if (!article) return { title: 'Article not found', description: 'Article not found' }
  return {
    title: article.title,
    description: article.description
  }
}


export default async function ArticlePage () {

  return (
    <main className='flex flex-col w-full h-full px-20 py-10 min-h-screen justify-center items-center'>
        <ArticleDetails />
    </main>

  )
}

