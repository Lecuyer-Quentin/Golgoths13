import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'News',
  description: 'News du site',
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex flex-col w-full h-full px-5 py-10 min-h-screen justify-center items-center'>
        {children}
    </main>
  )
}