import SigninDialog from "@/components/auth/signin/signin.dialog"
import Nav from "@/components/nav"
import { cookies } from "next/headers"

export default function MenuLayout({children}: {children: React.ReactNode}) {
  const cookie = cookies().get('token')

  return (
    <>
      {!cookie && <SigninDialog />}
      <div className='sm:w-screen sm:max-w-5xl sm:mx-auto'>
        <Nav />
        <div className='mx-3 my-9 sm:mx-0'>
          {children}
        </div>
      </div>
    </>
  )
}
