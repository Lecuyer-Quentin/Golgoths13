import ArticlesList from '../ui/articles/articlesList/articlesList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tous les articles',
  description: 'Articles du site',
}

export default function ArticlesPage() {
  return (
    <main>
        <h1>Tous les articles</h1>
        <ArticlesList />
    </main>
  )
}
