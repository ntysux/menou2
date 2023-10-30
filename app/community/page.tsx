import Content from "@/components/community/content"
import { MenuPublicPreview } from "@/redux/menu.public/types"
import { url } from "@/utils/app.url"

async function getAllMenuPublic(): Promise<MenuPublicPreview[]> {
  const response = await fetch(`${url}/community/api`, {cache: 'no-store'})
  const result = await response.json()
  return result.menuPublicPreview
}

export default async function Page() {
  const pages = await getAllMenuPublic()
  return <Content pages={pages} />
}