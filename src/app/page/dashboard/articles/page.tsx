import ArticlesList from '@/app/ui/dashboard/articles/articlesList/articlesList'
import AddArticle from '@/app/ui/dashboard/articles/features/addArticle'

export default function ArticlesPage() {
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
