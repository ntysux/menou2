import ErrorMessage from "@/components/error.message"
import Content from "@/components/menu/page.content"
import { Menu } from "@/redux/menu/types"
import { url } from "@/utils/app.url"
import { decode } from "jsonwebtoken"
import { cookies } from "next/headers"

interface Result {
  page?: Menu
  error?: {
    code: string
    message: string
  }
}

async function getPage(id: string): Promise<Result> {
  const response = await fetch(`${url}/menu/${id}/api`, {next: {revalidate: 0}})
  const result = await response.json()
  return result
}

function checkUid(): string | undefined {
  const cookie = cookies().get('token')
  if (cookie) {
    const {value: token} = cookie
    const tokenDecoded = decode(token)

    if (typeof tokenDecoded !== 'string' && tokenDecoded) {
      const id = tokenDecoded['id']
      return id
    }
  }
  return undefined
}

export default async function ViewPage({params}: {params: {id: string}}) {
  const {id} = params,
    result = await getPage(id),
    uid = checkUid()

  return result.page && uid === result.page.uid 
    ? <Content page={result.page} />
    : <ErrorMessage>{result.error ? `${result.error.code}: ${result.error.message}` : 'Unknown post'}</ErrorMessage>
}