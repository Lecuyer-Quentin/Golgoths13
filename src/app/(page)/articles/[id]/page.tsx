
import ArticleDetails from '@/app/ui/articles/articleDetails'
import { getArticleDataById } from '@/libs/articles'


//todo : add metadata to article page 
export async function generateMetadata ({ params }: { params: { id: string } }) {
  const articleData = await getArticleDataById(params.id)
  if(!articleData) return null
  const { title, description} = articleData
  return {
    title : title,
    description : description
  }
}

export default function ArticlePage ({ params }: { params: { id: string } }) {

  return (
    <main className='flex flex-col w-full h-full px-20 py-10 min-h-screen'>
        <section className="w-full h-auto py-10">
            <ArticleDetails id={params.id} />
        </section>
    </main>

  )
}

