'use client'
import { useAppSelector } from "@/redux/hooks"
import { IconDiscountCheckFilled } from "@tabler/icons-react"
import Link from "next/link"

interface Props {
  index: number
}

export default function Card({index}: Props) {
  const page = useAppSelector(state => state.menuPublic)[index]

  return (
    <Link href={`/community/${page.id}`}>
      <div className="p-3 pb-11 bg-hero-pattern rounded-lg">
        <div className="flex items-end space-x-3 bg-white w-fit">
          <i className="text-xs text-neutral-600 font-medium">bởi</i>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-neutral-800 font-bold truncate max-w-[100px]">
              {page?.author.name}
            </span>
            {page?.author.verified && <IconDiscountCheckFilled size='17px' className="text-cyan-400" />}
          </div>
        </div>
        <i className="text-xs text-neutral-400 font-medium bg-white">
          {page.lastEditedTime}
        </i>
      </div>
      <div className="mt-1">
        <h2 className="text-sm text-neutral-800 font-bold truncate max-w-[150px]">
          {page?.name}
        </h2>
      </div>
    </Link>
  )
}