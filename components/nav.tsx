'use client'
import { usePathname } from "next/navigation"
import RouterMobile from "./router.mobile"

export default function Nav({children}: {children: React.ReactNode}) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 p-3 space-y-3 bg-white">
      <nav className="flex items-center justify-between">
        <h1 className='text-xl text-neutral-800 tracking-widest sm:opacity-0'>
          Menoú
        </h1>
        <div className="flex sm:opacity-0">
          <RouterMobile />
        </div>
      </nav>
      {['/menu', '/menu/trash'].some(url => url === pathname) && children}
    </header>
  )
}