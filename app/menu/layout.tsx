import SigninDialog from "@/components/auth/signin/dialog"
import Nav from "@/components/nav/nav"
import NavRouter from "@/components/nav/nav.router"
import NavRouterMobile from "@/components/nav/nav.router.mobile"
import Welcome from "@/components/welcome"
import { cookies } from "next/headers"

export default function MenuLayout({children}: {children: React.ReactNode}) {
  const cookie = cookies().get('token')

  return (
    <>
      <Welcome />
      {!cookie && <SigninDialog />}
      <div className='sm:w-screen sm:max-w-5xl sm:mx-auto'>
        <Nav>
          <NavRouterMobile cookie={cookie} />
          <NavRouter cookie={cookie} />
        </Nav>
        <div className='mx-3 my-9 sm:mx-0'>
          {children}
        </div>
      </div>
    </>
  )
}
