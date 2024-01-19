import { getSortedArticlesData } from "@/libs/articles";
import LastArticles from "../../ui/news/lastArticles/lastArticles"
import LastNews from "../../ui/news/lastNews/lastNews"
import LastVideo from "../../ui/news/lastVideo/lastVideo"
import Link from 'next/link';
import { Article } from '@../../../types';
import type { Metadata } from 'next'

export const metadata : Metadata = {
  title: 'News',
  description: 'News',
}

export async function generateStaticProps() {
  const data = await getSortedArticlesData()
  return {
    props: {
      data
    }
  }
}

export default async function News({ data } : { data : Article[] }) {
  const URL_VIDEOS = `/page/videos`
  const URL_ARTICLES = '/page/articles';

  const getLastNews = async () => {
    'use server'
    try {
      const data = await getSortedArticlesData();
      const lastNewsData = data.slice(0,5);
      return lastNewsData
    } catch (error) {
      return error
    }
  }

  const getLastVideo = async () => {
    'use server'
    try {
      const data = await getSortedArticlesData();
      const videosData = data.filter((article : Article) => {
            return article.tags && article.tags.includes('#video');
      });
      return videosData
    } catch (error) {
      return error
    }
  }

  const getLastArticles = async () => {
    'use server'
    try {
      const data = await getSortedArticlesData();
      const articlesData = data.filter((article : Article) => {
            return article.tags.includes('#article');
      })
      return articlesData
    } catch (error) {
      return error
    }
  }

  const lastNewsData = await getLastNews();
  const videosData = await getLastVideo();
  const articlesData = await getLastArticles();

  const errorLastNews = lastNewsData instanceof Error ? lastNewsData : null
  const errorVideos = videosData instanceof Error ? videosData : null
  const errorArticles = articlesData instanceof Error ? articlesData : null


  return (
    <>
    <section className="w-full">
          <div className="flex items-center justify-start mx-4 mb-8">
            <h2 className="text-4xl font-bold">Last News</h2>
          </div>
      <LastNews data={lastNewsData} error={errorLastNews} reset={getLastNews} />
    </section>
    <section className="w-full py-10">
          <div className="flex items-center justify-between mx-4 mb-8">
            <h2 className="text-4xl font-bold">Last Video</h2>
            <Link href={URL_VIDEOS}>
                View all
            </Link>
          </div>
      <LastVideo data={videosData} error={errorVideos} reset={getLastVideo} />
    </section>
    <section className="w-full py-10">
          <div className="flex items-center justify-between mx-4 mb-8">
            <h2 className="text-4xl font-bold">Last Articles</h2>
            <Link href={URL_ARTICLES}>
              View all
            </Link>
          </div>
      <LastArticles data={articlesData} error={errorArticles} reset={getLastArticles} />
    </section>
    </>
  )
}
