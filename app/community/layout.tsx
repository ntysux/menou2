import Nav from "@/components/nav"
import CardUser from "@/components/sidebar/card.user"
import Sidebar from "@/components/sidebar/sidebar"
import { User } from "@/redux/user/types"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { url } from "@/utils/app.url"
import { cookies } from "next/headers"

interface Result {
  user?: User
  error?: string
}

async function getUser(cookie: RequestCookie | undefined): Promise<Result> {
  const response = await fetch(`${url}/user/api`, {
    headers: {cookie: `token=${cookie?.value}`}
  })
  const result: Result = await response.json()
  return result
}

export default async function CommunityLayout({children}: {children: React.ReactNode}) {
  const cookie = cookies().get('token')
  const result = await getUser(cookie)

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
            <CardUser result={result} />
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
