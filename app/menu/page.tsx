import MenuContent from "@/components/menu/content"
import { Menu } from "@/redux/menu/types"
import { IconAlertTriangle } from "@tabler/icons-react"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

const url = process.env.NEXT_PUBLIC_APP_URL

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
    ? <MenuContent pages={result.pages} />
    : <ErrorMessage>{result.error}</ErrorMessage>
}

function ErrorMessage({children}: {children: string | undefined}) {
  return (
    <div className="p-9 space-y-3 shadow shadow-neutral-200 rounded-xl text-center">
      <div className="flex justify-center">
        <IconAlertTriangle size='27px' className="text-neutral-400" />
      </div>
      <p className="text-xs text-neutral-400 font-bold">
        {children}
      </p>
    </div>
  )
}