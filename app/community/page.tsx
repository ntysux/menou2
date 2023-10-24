import Content from "@/components/community/content"
import { MenuPublicPreview } from "@/redux/menu.public/types"
import { url } from "@/utils/app.url"

async function getAllPublicMenu(): Promise<MenuPublicPreview[]> {
  const response = await fetch(`${url}/community/api`, {cache: 'no-store'})
  const result: {pages: MenuPublicPreview[]} = await response.json()
  return result.pages
}

export default async function CommunityPage() {
  const pages = await getAllPublicMenu()
  
  return <Content pages={pages} />
}