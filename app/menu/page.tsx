import MenuContent from "@/components/menu/content"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

const url = process.env.NEXT_PUBLIC_APP_URL

async function allMenuPagesById(cookie: RequestCookie | undefined) {
  const response = await fetch(`${url}/menu/api`, {
    headers: {cookie: `token=${cookie?.value}`},
  })
  const result = await response.json()

  return result
}

export default async function MenuPage() {
  const cookie = cookies().get('token')
  const result = await allMenuPagesById(cookie)

  return result.pages ? (
    <MenuContent pages={result.pages} />
  ) : (
    <>{result.error}</>
  )
}