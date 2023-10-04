'use client'
import { MenuPublic } from "@/redux/menu.public/types"
import { IconArrowNarrowLeft, IconDiscountCheckFilled } from "@tabler/icons-react"
import Empty from "../empty"
import Comment from "./comment"
import { useRouter } from "next/navigation"

export default function Content({page}: {page: MenuPublic}) {
  const router = useRouter()
  const {name, materials, required, steps, author, comments} = page
  const fields = [
    {title: 'Nguyên liệu', value: materials}, 
    {title: 'Chuẩn bị', value: required}, 
    {title: 'Chế biến', value: steps}
  ]

  return (
    <div className="space-y-9 mb-20">
      <button onClick={() => router.back()}>
        <IconArrowNarrowLeft className="text-neutral-800" />
      </button>
      <div>
        <h2 className="text-xl text-neutral-800 font-bold">
          {name}
        </h2>
        <div className="flex items-end space-x-3">
          <i className="text-xs text-neutral-500 font-medium">
            bởi
          </i>
          <div className="flex items-end space-x-1">
            {author.verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
            <p className="text-xs text-neutral-800 font-bold">
              {author.name}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <p className="text-sm text-neutral-600 font-medium">
          {page.description}
        </p>
        <h3 className="text-2xl text-neutral-800 font-light">
          Hướng dẫn / chế biến
        </h3>
        {fields.map(({title, value}, index) =>
          <div key={index} className="space-y-1">
            <h4 className="text-sm text-neutral-800 font-bold">
              {title}
            </h4>
            {
              value &&
              <ul>
                {value.split('|').map((item, itemIndex) =>
                  <li key={itemIndex} className="text-sm text-neutral-800 font-medium">
                    {item}
                  </li>
                )}
              </ul>
            }
            {!value && <Empty>Trống</Empty>}
          </div>
        )}
      </div>
      <Comment comments={comments} />
    </div>
  )
}