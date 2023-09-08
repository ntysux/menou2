import MenuContent from "@/components/menu/content"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

const url = process.env.NEXT_PUBLIC_APP_URL

async function allMenuPagesById(cookie: RequestCookie | undefined) {
  const res = await fetch(`${url}/menu/api`, {
    headers: {cookie: `token=${cookie?.value}`},
  })
  const rs = await res.json()

  return rs
}

export default async function MenuPage() {
  const cookie = cookies().get('token')
  const rs = await allMenuPagesById(cookie)

  return !rs.error ? <MenuContent pages={rs.menuPages} /> : <>{rs.error}</>
}