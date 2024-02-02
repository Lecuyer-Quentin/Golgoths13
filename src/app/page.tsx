
import Hero from './ui/home/hero'
import LastNews from './ui/home/lastNews'
import Banner from './ui/home/banner'
import Cta from './ui/home/cta'
import Link from 'next/link';


export default function Home() {
  const URL_NEWS = '/news';

  return (
    <main className="flex flex-col items-center justify-center w-full h-full min-h-screen px-5 py-10
                    md:px-10 lg:px-20 ">

      <section className="w-full h-screen flex flex-col items-center justify-evenly
                        lg:justify-start lg:items-start lg:px-10 lg:py-20 
                        ">
        <Cta />
      </section>

      <section className="w-full relative flex justify-center items-center mb-20">
          <Banner />
      </section>

      <section className='w-full mb-20'>
          <Hero />
      </section>

      <section className="w-full h-auto flex flex-col items-center justify-center
                        lg:justify-start lg:items-start lg:px-10 lg:py-20">
        <div className="w-full h-auto flex flex-row items-center justify-between mb-10 ">
            <h2 className="text-3xl font-bold text-left ">Les dernières actualités</h2>

            <Link className="bg-yellow-400 text-black font-bold rounded-lg px-2 py-2 flex flex-row justify-center items-center w-20"
                  href={URL_NEWS} >
              Voir +
            </Link>
        </div>
        <LastNews />
      </section>
    </main>
  )
}
