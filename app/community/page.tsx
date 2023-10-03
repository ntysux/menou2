import Content from "@/components/community/content"
import { MenuPublic } from "@/redux/menu.public/types"
import { url } from "@/utils/app.url"

async function getAllPublicMenu(): Promise<MenuPublic[]> {
  const response = await fetch(`${url}/community/api`, {next: {revalidate: 300}})
  const result: {pages: MenuPublic[]} = await response.json()
  return result.pages
}

export default async function CommunityPage() {
  const pages = await getAllPublicMenu()
  
  return <Content pages={pages} />
}