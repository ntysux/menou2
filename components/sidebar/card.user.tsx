import { url } from "@/utils/app.url"
import { IconDiscountCheckFilled } from "@tabler/icons-react"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

interface Result {
  user?: {
    name: string
    verified: boolean
  }
  error?: string
}

async function getUser(cookie: RequestCookie | undefined): Promise<Result> {
  const response = await fetch(`${url}/community/api/user`, {
    headers: {cookie: `token=${cookie?.value}`}
  })
  const result: Result = await response.json()
  return result
}

export default async function CardUser() {
  const cookie = cookies().get('token')
  const result = await getUser(cookie)

  return (
    <div className="p-3 rounded-xl shadow shadow-neutral-200">
      <div className="flex items-center space-x-1 p-5">
        {result.user?.verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
        <p className="text-sm text-neutral-800 font-bold">
          {result.user?.name ?? result.error}
        </p>
      </div>
    </div>
  )
}