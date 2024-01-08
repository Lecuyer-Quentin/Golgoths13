import Hero from './ui/home/hero/hero'
import LastNews from './ui/home/lastNews/lastNews'
import Banner from './ui/home/banner/banner'
import Cta from './ui/home/cta/cta'

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center w-full h-full min-h-screen px-5 lg:px-20 py-10">
      <Cta />
      <Hero />
      <Banner />
      <LastNews />
    </main>
  )
}
