'use client'
import { usePathname } from "next/navigation"
import RouterMobile from "./router.mobile"
import Dashboard from "./menu/dashboard/dashboard"
import Search from "./community/search"

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 bg-white px-3 sm:px-0">
      <nav className="flex items-center justify-between py-3">
        <h1 className='text-xl text-neutral-800 tracking-widest sm:opacity-0'>
          Menoú
        </h1>
        <div className="flex sm:opacity-0">
          <RouterMobile />
        </div>
      </nav>
      {['/menu', '/menu/trash'].some(url => url === pathname) && <Dashboard />}
      {pathname.startsWith('/community') && <Search />}
    </header>
  )
}