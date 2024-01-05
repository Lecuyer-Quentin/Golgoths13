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
    <div className='flex flex-col w-full h-screen text-gray-800'>
        {children}
    </div>
  )
}
