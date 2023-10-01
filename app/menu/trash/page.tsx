import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"
import MenuTrashContent from "@/components/trash/content"
import { Menu } from "@/redux/menu/types"
import ErrorMessage from "@/components/error.message"
import { url } from "@/utils/app.url"

interface Result {
  pages?: Menu[]
  error?: string
}

async function allMenuPagesById(cookie: RequestCookie | undefined): Promise<Result> {
  const response = await fetch(`${url}/menu/api`, {
    headers: {cookie: `token=${cookie?.value}`}
  })
  const result = await response.json()
  return result
}

export default async function MenuPage() {
  const cookie = cookies().get('token')
  const result = await allMenuPagesById(cookie)

  return result.pages 
    ? <MenuTrashContent pages={result.pages} /> 
    : <ErrorMessage>{result.error!}</ErrorMessage>
}