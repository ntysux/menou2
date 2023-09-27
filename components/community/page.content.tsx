import { MenuPublic } from "@/redux/menu.public/types"
import { IconDiscountCheckFilled } from "@tabler/icons-react"
import { Fragment } from "react"

export default function Content({page}: {page: MenuPublic}) {
  const {name, materials, required, steps, author} = page
  const fields = [
    {title: 'Nguyên liệu', value: materials}, 
    {title: 'Chuẩn bị', value: required}, 
    {title: 'Chế biến', value: steps}
  ]

  return (
    <div className="space-y-9 mb-9">
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
            <p className="text-sm text-neutral-800 font-bold">
              {author.name}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm text-neutral-500 font-medium">
        {page.description}
      </p>
      <div className="space-y-3">
        <h3 className="text-lg text-neutral-800 font-medium">
          Hướng dẫn / chế biến
        </h3>
        {fields.map(({title, value}, index) =>
          <Fragment key={index}>
            <h4 className="text-xs text-neutral-800 font-bold">
              {title}
            </h4>
            <ul>
              {
                value?.split('|').map((item, itemIndex) =>
                  <li 
                    key={itemIndex} 
                    className="text-sm text-neutral-800 font-medium"
                  >
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