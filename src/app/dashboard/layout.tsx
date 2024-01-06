import type { Metadata } from 'next'
import Sidebar from '../ui/dashboard/sidebar/sidebar'
import Navbar from '../ui/dashboard/navbar/navbar'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard admin du site',
}

export default function DashLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-row h-screen bg-gray-100'>
            <Sidebar />
        <div className='flex flex-col w-full h-screen text-gray-800'>
            <Navbar />
            {children}
        </div>
    </div>
  )
}
