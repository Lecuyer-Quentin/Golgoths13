import Hero from './ui/home/hero/hero'
import LastNews from './ui/home/lastNews/lastNews'
import Banner from './ui/home/banner/banner'

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center w-full h-full px-20">
      <Hero />
      <Banner />
      <LastNews />
    </main>
  )
}
