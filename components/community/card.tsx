'use client'
import { MenuPublicPreview } from "@/redux/menu.public/types"
import { IconDiscountCheckFilled } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function Card({page}: {page: MenuPublicPreview}) {
  const {id, name, description, author: {name: authorName, verified}} = page
  const router = useRouter()

  function nextPage() {
    router.push(`/community/${id}`)
  }

  return (
    <div 
      className="p-9 space-y-3 rounded-xl shadow shadow-neutral-200 hover:ring-1 hover:ring-neutral-200 hover:ring-inset"
      onClick={nextPage}
    >
      <div>
        <h2 className="text-sm text-neutral-800 font-bold max-w-[250px] truncate">
          {name}
        </h2>
        <div className="flex items-end space-x-3">
          <i className="text-xs font-medium text-neutral-500">
            bởi
          </i>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-neutral-800 font-bold max-w-[150px] truncate">
              {authorName}
            </span>
            {verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
          </div>
        </div>
      </div>
      <p className="text-sm text-neutral-800 font-medium max-w-[200px] truncate">
        {description}
      </p>
    </div>
  )
}