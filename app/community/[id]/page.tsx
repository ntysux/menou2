import { MenuPublic } from "@/redux/menu.public/types"
import { IconAlertTriangle, IconDiscountCheckFilled } from "@tabler/icons-react"
import { Fragment } from "react"

const url = process.env.NEXT_PUBLIC_APP_URL

interface Result {
  page?: MenuPublic
  error?: {
    code: string
    message: string
  }
}

async function getOnePublicMenu(id: string): Promise<Result> {
  const response = await fetch(`${url}/community/${id}/api`, {next: {revalidate: 300}})
  const result: Result = await response.json()
  return result
}

export default async function Page({params}: {params: {id: string}}) {
  const {id} = params
  const result = await getOnePublicMenu(id)

  return result.page 
  ? <Content page={result.page} /> 
  : <ErrorMessage>{`${result.error?.code}: ${result.error?.message}`}</ErrorMessage>
}

function Content({page}: {page: MenuPublic}) {
  const fields = [
    {title: 'Nguyên liệu', value: page.materials}, 
    {title: 'Chuẩn bị', value: page.required}, 
    {title: 'Chế biến', value: page.steps}
  ]

  return (
    <div className="space-y-9 mb-9">
      <div>
        <h2 className="text-xl text-neutral-800 font-medium">{page.name}</h2>
        <div className="flex items-end space-x-3">
          <i className="text-xs text-neutral-500 font-medium">
            bởi
          </i>
          <div className="flex items-end space-x-1">
            {page.verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
            <p className="text-sm text-neutral-800 font-bold">
              {page.uname}
            </p>
          </div>
        </div>
      </div>
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