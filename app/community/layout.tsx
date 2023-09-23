import Nav from "@/components/nav"
import CardUser from "@/components/sidebar/card.user"
import Sidebar from "@/components/sidebar/sidebar"

export default function CommunityLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='sm:flex sm:gap-3 sm:w-screen sm:max-w-5xl sm:mx-auto'>
      <div className='hidden sm:block'>
        <div className='sticky top-0'>
          <div className='py-3'>
            <h1 className='text-xl text-neutral-800 tracking-widest block'>
              Menoú
            </h1>
          </div>
          <Sidebar>
            <CardUser />
          </Sidebar>
        </div>
      </div>
      <div className='sm:flex-1'>
        <Nav />
        <div className='m-3 sm:mx-0'>
          {children}
        </div>
      </div>
    </div>
  )
}
