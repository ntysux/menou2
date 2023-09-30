import Content from "@/components/community/content"
import { MenuPublic } from "@/redux/menu.public/types"

// const url = process.env.NEXT_PUBLIC_APP_URL

// interface Result {
//   pages?: MenuPublic[]
//   error?: string
// }

// async function getAllPublicMenu(): Promise<Result> {
//   const response = await fetch(`${url}/community/api`, {next: {revalidate: 300}})
//   const result = await response.json()
//   return result
// }

export default async function CommunityPage() {
  // const result = await getAllPublicMenu()
  
  return <></>
}

// result.pages ? <Content pages={result.pages} /> : <>{result.error}</>