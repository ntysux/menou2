import { Menu } from "@/redux/menu/types"
import Empty from "../empty"

interface Field {
  title: string
  value: string | undefined
}

export default function Content({page}: {page: Menu}) {
  const fields: Field[] = [
    {title: 'Nguyên liệu', value: page.materials}, 
    {title: 'Chuẩn bị', value: page.required}, 
    {title: 'Chế biến', value: page.steps}
  ]

  return (
    <div className="mb-9">
      <h2 className="text-lg text-neutral-800 font-bold">
        {page.name}
      </h2>
      <div className="mt-7 space-y-3">
        <p className="text-sm text-neutral-500 font-medium">
          {page.description}
        </p>
        <div className="space-y-1">
          {fields.map(({title, value}, fieldIndex) =>
            <div key={fieldIndex} className="space-y-1 p-5 shadow shadow-neutral-200 rounded-xl">
              <h4 className="text-sm text-neutral-800 font-bold">
                {title}
              </h4>
              {
                value && 
                <ul>
                  {
                    value?.split('|').map((item, ItemIndex) =>
                      <li key={ItemIndex} className="text-sm text-neutral-800 font-medium">
                        {item}
                      </li>
                    )
                  }
                </ul>
              }
              {!value && <Empty>Trống</Empty>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}