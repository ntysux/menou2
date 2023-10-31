import Back from "@/components/community/page/back"
import Comment from "@/components/community/page/comment"
import Empty from "@/components/empty"
import { MenuPublic } from "@/redux/menu.public/types"
import { url } from "@/utils/app.url"
import { IconDiscountCheckFilled } from "@tabler/icons-react"

async function getMenuPublicPage(pid: string): Promise<MenuPublic> {
  const response = await fetch(`${url}/community/${pid}/api`, {cache: 'no-store'})
  const result = await response.json()
  return result
}

export default async function Page({params: {id}}: {params: {id: string}}) {
  const {uid, name, lastEditedTime, description, materials, required, steps, author, comments} = await getMenuPublicPage(id)

  const fields = [
    {name: 'Nguyên liệu', data: materials}, 
    {name: 'Chuẩn bị', data: required},
    {name: 'Chế biến', data: steps}
  ]

  return (
    <>
      <Back />
      <div className="mt-3 sm:flex sm:justify-between">
        <h1 className="text-3xl text-neutral-800 font-light truncate max-w-3xl">
          {name}
        </h1>
        <i className="text-xs text-neutral-500 font-medium">
          Cập nhập lần cuối: <span>{lastEditedTime}</span>
        </i>
      </div>
      <div className="flex items-end space-x-3">
        <i className="text-xs text-neutral-500 font-medium">
          bởi
        </i>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-neutral-800 font-bold">
            {author.name}
          </span>
          {author.verified && <IconDiscountCheckFilled size='17px' className="text-cyan-400" />}
        </div>
      </div>
      <div className="mt-9 space-y-5">
        <p className="text-neutral-600 font-medium">
          {description}
        </p>
        {fields.map(field => 
          <div key={field.name} className="space-y-1">
            <h2 className="text-sm text-neutral-800 font-bold">
              {field.name}
            </h2>
            {
              field.data 
              ?
              <ul>
                {field.data?.split('|').map((text, index) =>
                  <li key={index} className="text-sm text-neutral-500 font-medium">
                    {text}
                  </li>
                )}
              </ul>
              :
              <Empty>Bước đang phát triển</Empty>
            }
          </div>
        )}
      </div>
      <div className="my-9 space-y-3">
        <Comment 
          uid={uid}
          comments={comments.reverse()} 
        />
      </div>
    </>
  )
}