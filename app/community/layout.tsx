import ErrorMessage from "@/components/error.message"
import Nav from "@/components/nav/nav"
import NavCardUser from "@/components/nav/nav.user"
import { User } from "@/redux/user/types"
import { url } from "@/utils/app.url"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

interface Result {
  user?: User
  error?: string
}

async function getUser(cookie: RequestCookie | undefined): Promise<Result> {
  const response = await fetch(`${url}/user/api`, {
    headers: {cookie: `token=${cookie?.value}`}
  })
  const result = await response.json()
  return result
}

export default async function CommunityLayout({children}: {children: React.ReactNode}) {
  const cookie = cookies().get('token')
  const {user, error} = await getUser(cookie)

  return (
    <div className='sm:w-screen sm:max-w-5xl sm:mx-auto'>
      <Nav>
        {user && <NavCardUser user={user} />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Nav>
      <div className='m-3 my-9 sm:mx-0'>
        {children}
      </div>
    </div>
  )
}
