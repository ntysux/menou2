'use client'
import { usePathname } from "next/navigation"
import Dashboard from "../menu/dashboard/dashboard"
import Search from "../community/search"
import Settings from "../community/settings"

interface Props {
  children: React.ReactNode
}

export default function Nav({children}: Props) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 bg-white px-3 sm:px-0">
      <nav className="flex items-center justify-between py-3">
        <h1 className='text-lg text-neutral-800 font-medium tracking-widest'>
          Menoú
        </h1>
        <div className="flex items-center space-x-5">
          {children}
        </div>
      </nav>
      {['/menu', '/menu/trash'].some(url => url === pathname) && <Dashboard />}
      {
        pathname === '/community' && 
        <div className="flex items-center space-x-3">
          <Search />
          <Settings />
        </div>
      }
    </header>
  )
}