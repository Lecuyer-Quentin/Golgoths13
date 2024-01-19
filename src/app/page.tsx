
import Hero from './ui/home/hero/hero'
import LastNews from './ui/home/lastNews/lastNews'
import Banner from './ui/home/banner/banner'
import Cta from './ui/home/cta/cta'
import Link from 'next/link';
import { getArticlesData , getSortedArticlesData } from '@/libs/articles'
import { Article } from '../../types';

export async function generateStaticProps() {
  const articlesData = await getArticlesData();
  return {
    props: {
      articlesData
    }
  }
}


export default async function Home({articlesData} : {articlesData: Article[]}) {
  const URL_NEWS = '/page/news';

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

  const getHeroData = async () => {
    'use server'
    try {
      const data = await getSortedArticlesData();
      const heroData = data.slice(0,4);
      return heroData
    } catch (error) {
      return error
    }
  }

  const getBannerData = async () => {
    'use server'
    try {
      const data = await getSortedArticlesData();
      const bannerData = data.slice(0,3);
      return bannerData
    } catch (error) {
      return error
    }
  }

  const lastNewsData = await getLastNews();
  const heroData = await getHeroData();
  const bannerData = await getBannerData();

  const errorLastNews = lastNewsData instanceof Error ? lastNewsData : null
  const errorHero = heroData instanceof Error ? heroData : null
  const errorBanner = bannerData instanceof Error ? bannerData : null





  return (
    <main className="flex flex-col items-center justify-center w-full h-full min-h-screen px-5 md:px-20 lg:px-20 py-10">
      <section className="w-full h-screen flex flex-col items-center justify-evenly
                        lg:justify-start lg:items-start lg:px-20 lg:py-20 ">
        <Cta />
      </section>

      <section className="w-full relative flex justify-center items-center mb-20">
        <Hero data={heroData} error={errorHero} reset={getHeroData} />
      </section>

      <section className="w-full h-auto py-10">
        <Banner data={bannerData} error={errorBanner} reset={getBannerData} />
      </section>

      <section id='lastNews' className="w-full h-auto py-10 ">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">Last News</h2>
            <Link href={URL_NEWS}>
              See all
            </Link>
          </div>
        <LastNews data={lastNewsData} error={errorLastNews} reset={getLastNews} />
        
      </section>
    </main>
  )
}
