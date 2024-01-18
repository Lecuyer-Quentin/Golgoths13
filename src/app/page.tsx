import Hero from './ui/home/hero/hero'
import LastNews from './ui/home/lastNews/lastNews'
import Banner from './ui/home/banner/banner'
import Cta from './ui/home/cta/cta'
import Link from 'next/link';

export default function Home() {
  const URL_NEWS = '/page/news';


  return (
    <main className="flex flex-col items-center justify-center w-full h-full min-h-screen px-5 md:px-20 lg:px-20 py-10">
      <section className="w-full h-screen flex flex-col items-center justify-evenly
                        lg:justify-start lg:items-start lg:px-20 lg:py-20 ">
        <Cta />
      </section>

      <section className="w-full relative flex justify-center items-center mb-20">
        <Hero />
      </section>

      <section className="w-full h-auto py-10">
        <Banner />
      </section>

      <section id='lastNews' className="w-full h-auto py-10 ">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">Last News</h2>
            <Link href={URL_NEWS}>
              See all
            </Link>
          </div>
        <LastNews />
      </section>
    </main>
  )
}
