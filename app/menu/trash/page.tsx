import { Menu } from "@/redux/menu/types"
import { IconSoup } from "@tabler/icons-react"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"
import MenuTrashContent from "@/components/menu/trash/content"

const url = process.env.NEXT_PUBLIC_APP_URL
async function allMenuPagesById(cookie: RequestCookie | undefined) {
  const res = await fetch(`${url}/menu/api`, {
    headers: {cookie: `token=${cookie?.value}`},
  })
  const rs = await res.json()

  return rs
}

export default async function MenuPage() {
  const cookie = cookies().get('token')
  const rs = await allMenuPagesById(cookie)

  return rs.menuPages.filter((page: Menu) => page.deleted).length ? (
    <MenuTrashContent pages={rs.menuPages} />
  ) : (
    <>
      {rs.error ?? <Empty />}
    </>
  )
}

function Empty() {
  return (
    <div className="p-9 mt-3 space-y-5 text-center">
      <div className="flex justify-center">
        <IconSoup size='40px' className="text-neutral-200" />
      </div>
      <div>
        <h2 className="text-lg text-neutral-600 font-light tracking-wider">
          Món ăn đã xóa sẽ hiển thị tại đây.
        </h2>
        <p className="text-sm text-neutral-400 font-light">
          Nhấn vào <span className="text-neutral-600 font-medium">Khôi phục</span> để khôi phục món ăn.
        </p>
      </div>
    </div>
  )
}