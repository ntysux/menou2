'use client'
import RouterMobile from "./router.mobile"

export default function Nav({children}: {children: React.ReactNode}) {
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
      {children}
    </header>
  )
}