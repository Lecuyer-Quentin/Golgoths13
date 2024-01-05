'use client'

import ArticleDetails from '@/app/ui/articles/articleDetails/articleDetails'
import {useParams} from 'next/navigation'

export default function ArticlePage () {
    const { id } = useParams()
    //const articleId = Array.isArray(id) ? id[0] : id;


  return (
    <main>
        <h1>ArticlePage</h1>
        <ArticleDetails id={id} />
    </main>

  )
}
