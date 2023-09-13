import { Menu } from "@/redux/menu/types"

interface Result {
  page?: Menu
  error?: string
}
const url = process.env.NEXT_PUBLIC_APP_URL

async function getPage(id: string) {
  const response = await fetch(`${url}/menu/${id}/api`, {next: {revalidate: 0}}),
    result: Result = await response.json()
  return result
}

export default async function ViewPage({params}: {params: {id: string}}) {
  const {id} = params,
    result = await getPage(id)

  return result.page ? (
    <div className="space-y-9">
      <h2 className="text-lg text-neutral-800 font-bold">
        {result.page.name}
      </h2>
      <div className="space-y-3">
        <h3 className="text-neutral-800 font-semibold">
          Hướng dẫn / chế biến
        </h3>
        <h4 className="text-neutral-800 text-sm font-bold">
          Nguyên liệu
        </h4>
        <ul>
          {result.page.materials?.split('|').map((item, index) =>
            <li key={index} className="text-sm text-neutral-800 font-medium">
              {item}
            </li>
          )}
        </ul>
        <h4 className="text-neutral-800 text-sm font-bold">
          Chuẩn bị
        </h4>
        <ul>
          {result.page.required?.split('|').map((item, index) =>
            <li key={index} className="text-sm text-neutral-800 font-medium">
              {item}
            </li>
          )}
        </ul>
        <h4 className="text-neutral-800 text-sm font-bold">
          Chế biến
        </h4>
        <ul>
          {result.page.steps?.split('|').map((item, index) =>
            <li key={index} className="text-sm text-neutral-800 font-medium">
              {item}
            </li>
          )}
        </ul>
      </div>
    </div>
  ) : (
    <>{result.error}</>
  )
}