import Content from "@/components/community/page.content"
import ErrorMessage from "@/components/error.message"
import { MenuPublic } from "@/redux/menu.public/types"
import { url } from "@/utils/app.url"

interface PageResult {
  page?: MenuPublic
  error?: {
    code: string
    message: string
  }
}

async function getPage(id: string): Promise<PageResult> {
  const response = await fetch(`${url}/community/${id}/api`, {next: {revalidate: 0}})
  const result: PageResult = await response.json()
  return result
}

export default async function Page({params}: {params: {id: string}}) {
  const {id} = params
  const page = await getPage(id)

  return page.page
  ? <Content page={page.page} />
  : <ErrorMessage>{`Lỗi: ${page.error?.code}`}</ErrorMessage>
}