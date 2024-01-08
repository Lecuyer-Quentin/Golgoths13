import ArticlesList from '../../ui/articles/articlesList/articlesList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tous les articles',
  description: 'Articles du site',
}

export default function ArticlesPage() {
  return (
    <main className='flex flex-col w-full h-full px-20 py-10 min-h-screen'>
        <h1>Tous les articles</h1>
        <ArticlesList />
    </main>
  )
}
