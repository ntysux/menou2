import Comment from "@/components/community/comment"
import Content from "@/components/community/page.content"
import { MenuPublic } from "@/redux/menu.public/types"
import { IconAlertTriangle } from "@tabler/icons-react"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

export const revalidate = 0

const url = process.env.NEXT_PUBLIC_APP_URL

interface PageResult {
  page?: MenuPublic
  error?: {
    code: string
    message: string
  }
}

interface UserResult {
  user?: {
    id: string
    name: string
    verified: boolean
  }
  error?: string
}

async function getOnePublicMenu(id: string): Promise<PageResult> {
  const response = await fetch(`${url}/community/${id}/api`)
  const result: PageResult = await response.json()
  return result
}

async function getUser(cookie: RequestCookie | undefined): Promise<UserResult> {
  const response = await fetch(`${url}/community/api/user`, {
    headers: {cookie: `token=${cookie?.value}`}
  })
  const result: UserResult = await response.json()
  return result
}

export default async function Page({params}: {params: {id: string}}) {
  const {id} = params,
    cookie = cookies().get('token'),
    pageResult = await getOnePublicMenu(id),
    userResult = await getUser(cookie)

  return (pageResult.page && userResult.user)
  ? <>
      <Content page={pageResult.page} /> 
      <Comment 
        currentUser={userResult.user}
        commentList={pageResult.page.comments}
      />
    </>
  : <ErrorMessage>
      {`${pageResult.error?.code}: ${pageResult.error?.message}`}
    </ErrorMessage>
}

function ErrorMessage({children}: {children: string}) {
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