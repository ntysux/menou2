'use client'
import { MenuPublicPreview } from "@/redux/menu.public/types"
import { IconDiscountCheckFilled } from "@tabler/icons-react"

export default function Card({page}: {page: MenuPublicPreview}) {
  const {name, author: {name: authorName, verified}} = page

  return (
    <div>
      <div className="p-3 pb-11 bg-hero-pattern rounded-lg">
        <div className="flex items-end space-x-3 bg-white w-fit">
          <i className="text-xs text-neutral-600 font-medium">bởi</i>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-neutral-800 font-bold truncate max-w-[100px]">
              {authorName}
            </span>
            {verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
          </div>
        </div>
        <i className="text-xs text-neutral-400 font-medium bg-white">
          10/26/2023
        </i>
      </div>
      <div className="mt-1">
        <h2 className="text-sm text-neutral-800 font-bold truncate max-w-[150px]">
          {name}
        </h2>
      </div>
    </div>
  )
}