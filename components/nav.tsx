export default function Nav({children}: {children: React.ReactNode}) {
  return (
    <header className="sticky top-0 z-10 bg-white">
      <nav className="flex justify-end items-center space-x-9 py-5">
        <h3 className="text-sm text-neutral-800 font-medium leading-none">
          Cá nhân
        </h3>
        <h3 className="text-sm text-neutral-800 font-medium leading-none">
          Cộng đồng
        </h3>
      </nav>
      {children}
    </header>
  )
}