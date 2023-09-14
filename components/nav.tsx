'use client'
import { usePathname } from "next/navigation"
import RouterMobile from "./router.mobile"

export default function Nav({children}: {children: React.ReactNode}) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 bg-white">
      <nav className="flex justify-between sm:justify-end items-center py-5 px-3 sm:px-0">
        <h1 className='text-xl text-neutral-800 tracking-widest block sm:hidden'>
          Menoú
        </h1>
        <div className="flex space-x-9 sm:hidden">
          <RouterMobile />
        </div>
        <div className="hidden space-x-9 sm:flex">
          <h3 className="text-sm text-neutral-800 font-medium leading-none">
            Cá nhân
          </h3>
          <h3 className="text-sm text-neutral-800 font-medium leading-none">
            Cộng đồng
          </h3>
        </div>
      </nav>
      {['/menu', '/menu/trash'].some(url => url === pathname) && children}
    </header>
  )
}