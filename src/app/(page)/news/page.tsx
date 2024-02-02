import LastArticles from "../../ui/news/lastArticles"
import LastNews from "../../ui/news/lastNews";
import LastVideo from "../../ui/news/lastVideo"
import Link from 'next/link';
import type { Metadata } from 'next'

export const metadata : Metadata = {
  title: 'News',
  description: 'News',
}

export default function News() {
  const URL_VIDEOS = `/videos`
  const URL_ARTICLES = '/articles';

  return (
    <main className='flex flex-col w-full h-full px-5 py-10 min-h-screen justify-center items-center'>

    <section className="w-full">
          <div className="flex items-center justify-start mx-4 mb-8">
            <h2 className="text-4xl font-bold">Last News</h2>
          </div>
          <LastNews />
    </section>

    <section className="w-full py-10">
          <div className="flex items-center justify-between mx-4 mb-8">
            <h2 className="text-4xl font-bold">Last Video</h2>
            <Link href={URL_VIDEOS}>
                View all
            </Link>
          </div>
          <LastVideo />
    </section>

    <section className="w-full py-10">
          <div className="flex items-center justify-between mx-4 mb-8">
            <h2 className="text-4xl font-bold">Last Articles</h2>
            <Link href={URL_ARTICLES}>
              View all
            </Link>
          </div>
          <LastArticles />
    </section>

    </main>
  )
}
