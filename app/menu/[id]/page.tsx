import { Menu } from "@/redux/menu/types"
import { IconAlertTriangle } from "@tabler/icons-react"
import { decode } from "jsonwebtoken"
import { cookies } from "next/headers"
import { Fragment } from 'react'

interface Result {
  page?: Menu
  error?: {
    code: string
    message: string
  }
}
const url = process.env.NEXT_PUBLIC_APP_URL

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

function Content({page}: {page: Menu}) {
  const fields = [
    {title: 'Nguyên liệu', value: page.materials}, 
    {title: 'Chẩn bị', value: page.required}, 
    {title: 'Chế biến', value: page.steps}
  ]

  return (
    <div className="space-y-9 mb-9">
      <h2 className="text-xl text-neutral-800 font-medium">{page.name}</h2>
      <div className="space-y-3">
        <h3 className="text-neutral-800 font-light">Hướng dẫn / chế biến</h3>
        {fields.map((field, fieldIndex) =>
          <Fragment key={fieldIndex}>
            <h4 className="text-neutral-800 text-xs font-bold">{field.title}</h4>
            <ul>
              {
                field.value?.split('|').map((item, ItemIndex) =>
                  <li key={ItemIndex} className="text-sm text-neutral-800 font-medium">
                    {item}
                  </li>
                )
                ??
                <Empty />
              }
            </ul>
          </Fragment>
        )}
      </div>
    </div>
  )
}

function Empty() {
  return (
    <div className="p-9 border border-dashed border-neutral-300 rounded-lg text-center text-sm text-neutral-400 font-medium">
      Trống
    </div>
  ) 
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