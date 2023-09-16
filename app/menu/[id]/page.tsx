import { Menu } from "@/redux/menu/types"
import { IconAlertTriangle } from "@tabler/icons-react"
import { Fragment } from 'react'

interface Result {
  page?: Menu
  error?: string
}
const url = process.env.NEXT_PUBLIC_APP_URL

async function getPage(id: string): Promise<Result> {
  const response = await fetch(`${url}/menu/${id}/api`, {next: {revalidate: 0}})
  const result = await response.json()
  return result
}

export default async function ViewPage({params}: {params: {id: string}}) {
  const {id} = params
  const result = await getPage(id)

  return result.page ? (
    <div className="space-y-9 mb-9">
      <h2 className="text-xl text-neutral-800 font-medium">
        {result.page.name}
      </h2>
      <div className="space-y-3">
        <h3 className="text-neutral-800 font-light">
          Hướng dẫn / chế biến
        </h3>
        {
          [
            {title: 'Nguyên liệu', value: result.page.materials}, 
            {title: 'Chẩn bị', value: result.page.required}, 
            {title: 'Chế biến', value: result.page.steps}
          ].map((field, index) =>
          <Fragment key={index}>
            <h4 className="text-neutral-800 text-xs font-bold">{field.title}</h4>
            <ul>
              {
                field.value?.length 
                ?
                field.value?.split('|').map((item, index) =>
                  <li key={index} className="text-sm text-neutral-800 font-medium">
                    {item}
                  </li>
                )
                :
                <Empty />
              }
            </ul>
          </Fragment>
        )}
      </div>
    </div>
  ) : (
    <div className="p-9 space-y-3 shadow shadow-neutral-200 rounded-xl text-center">
      <div className="flex justify-center">
        <IconAlertTriangle size='27px' className="text-neutral-400" />
      </div>
      <p className="text-xs text-neutral-400 font-bold">{result.error}</p>
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