import MenuContent from "@/components/menu/content"
import { cookies } from "next/headers"

const url = process.env.NEXT_PUBLIC_APP_URL

async function allMenuPagesById() {
  const cookie = cookies().get('token')
  const res = await fetch(`${url}/menu/api`, {
    headers: {cookie: `token=${cookie?.value}`}
  })
  const rs = await res.json()

  return rs
}

export default async function MenuPage() {
  const rs = await allMenuPagesById()

  return !rs.error ? <MenuContent pages={rs.menuPages} /> : <>{rs.error}</>
}