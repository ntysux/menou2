import Content from "@/components/community/content"
import { MenuPublic } from "@/redux/menu.public/types"
import { url } from "@/utils/app.url"

async function getAllMenuPublic(): Promise<MenuPublic[]> {
  const response = await fetch(`${url}/community/api`, {cache: 'no-store'})
  const result = await response.json()
  return result.menuPublic
}

export default async function CommunityPage() {
  const menuPublic = await getAllMenuPublic()
  
  return <Content pages={menuPublic} />
}