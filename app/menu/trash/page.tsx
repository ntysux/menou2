import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"
import MenuTrashContent from "@/components/trash/content"
import { Menu } from "@/redux/menu/types"
import ErrorMessage from "@/components/error.message"
import { url } from "@/utils/app.url"
import { User } from "@/redux/user/types"
import { MenuGroup } from "@/redux/menu.group/types"

interface Result {
  results?: {
    pages: Menu[]
    user: User,
    groupPages: MenuGroup[]
  }
  error?: string
}

async function getMenuPagesAndUser(cookie: RequestCookie | undefined): Promise<Result> {
  const response = await fetch(`${url}/menu/api`, {
    headers: {cookie: `token=${cookie?.value}`}
  })
  return response.json()
}

export default async function MenuPage() {
  const cookie = cookies().get('token')
  const {results, error} = await getMenuPagesAndUser(cookie)

  return results
    ? <MenuTrashContent results={results} />
    : <ErrorMessage>{error!}</ErrorMessage>
}