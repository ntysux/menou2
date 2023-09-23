'use client'
import Sidebar from '@/components/sidebar/sidebar'
import Nav from '@/components/nav'
import Dashboard from '@/components/menu/dashboard/dashboard'
import { usePathname } from 'next/navigation'
import Search from './community/search'

export default function Layout({children}: {children: React.ReactNode}) {
  const pathname = usePathname()

  return pathname === '/' ? (
    children
  ) : (
    <div className='sm:flex sm:gap-3 sm:w-screen sm:max-w-5xl sm:mx-auto'>
      <div className='hidden sm:block'>
        <div className='sticky top-0'>
          <div className='py-3'>
            <h1 className='text-xl text-neutral-800 tracking-widest block'>
              Menoú
            </h1>
          </div>
          <Sidebar />
        </div>
      </div>
      <div className='sm:flex-1'>
        <Nav>
          {['/menu', '/menu/trash'].some(url => url === pathname) && <Dashboard />}
          {pathname.startsWith('/community') && <Search />}
        </Nav>
        <div className='m-3 sm:mx-0'>
          {children}
        </div>
      </div>
    </div>
  )
}