import type { Metadata } from 'next'
import Sidebar from '../../ui/dashboard/sidebar'
import Navbar from '../../ui/dashboard/navbar'

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
    <div className='flex flex-col h-full min-h-screen md:flex-row'>
            <Sidebar />
        <div className='flex flex-col w-full h-full'>
            <Navbar />
            <div className='flex flex-col w-full px-6 py-8 md:px-8'>
              {children}
            </div>
        </div>
    </div>
  )
}
