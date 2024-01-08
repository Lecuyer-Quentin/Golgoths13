//'use client'

import ArticleDetails from '@/app/ui/articles/articleDetails/articleDetails'

export async function generateMetadata() {
  return {
    title: 'Article',
    description: 'Article',
  }
}
export default function ArticlePage () {

  return (
    <main className='flex flex-col w-full h-full px-20 py-10 min-h-screen'>
        <ArticleDetails />
    </main>

  )
}
