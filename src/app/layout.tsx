import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/globals.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Providers } from './context/providers';
import Footer from './ui/layout/footer';
import Header from './ui/layout/header';
import { Suspense } from 'react';
import Loading from './loading';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Golgoths 13',
  description: 'Site du club de basket Golgoths 13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className + ''}
      >
        <Providers>
          <Header />
            {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
