import { MenuPublic } from "@/redux/menu.public/types"
import { IconDiscountCheckFilled } from "@tabler/icons-react"
import Link from "next/link"

export default function Card({page}: {page: MenuPublic}) {
  const {id, name, uname, verified} = page

  return (
    <Link href={`/community/${id}`}>
      <div className="group py-3 p-7 space-y-3 rounded-xl bg-hero-pattern">
        <div>
          <h2 className="text-sm text-white font-bold bg-neutral-800 w-fit max-w-[250px] truncate group-hover:bg-white group-hover:text-neutral-800">
            {name}
          </h2>
          <div className="bg-white w-fit flex items-end space-x-3">
            <i className="text-xs font-medium text-neutral-500">
              bởi
            </i>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-neutral-800 font-bold w-fit max-w-[150px] truncate">
                {uname}
              </span>
              {verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
            </div>
          </div>
        </div>
        <p className="text-sm text-neutral-800 font-medium bg-white w-fit max-w-[200px] truncate">
          Lorem
        </p>
      </div>
    </Link>
  )
}