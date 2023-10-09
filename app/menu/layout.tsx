import SigninDialog from "@/components/auth/signin/signin.dialog"
import Nav from "@/components/nav"
import Sidebar from "@/components/sidebar/sidebar"
import { cookies } from "next/headers"

export default function MenuLayout({children}: {children: React.ReactNode}) {
  const cookie = cookies().get('token')

  return (
    <>
      {!cookie && <SigninDialog />}
      <div className='sm:flex sm:gap-7 sm:w-screen sm:max-w-5xl sm:mx-auto'>
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
          <Nav />
          <div className='mx-3 my-9 sm:mx-0'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
