import Signin from "@/components/signin"
import ReduxProviders from "@/redux/providers"
import SetInitMenuPages from "@/utils/menu/set.init"
import { cookies } from "next/headers"

const url = process.env.NEXT_PUBLIC_APP_URL

async function allMenuPagesById(cookie: any) {
  const res = await fetch(`${url}/menu/api`, {
    headers: {cookie: `token=${cookie?.value}`}
  })
  const rs = await res.json()

  if (rs.menuPages) {
    return rs.menuPages
  }

  return undefined
}

export default async function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie = cookies().get('token')
  const rs = await allMenuPagesById(cookie)

  return (
    <>
      {!cookie && <Signin />}

      <ReduxProviders>
        <SetInitMenuPages pages={rs}>
          {children}
        </SetInitMenuPages>
      </ReduxProviders>
    </>
  )
}
