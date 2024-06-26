'use client'
import { useAppSelector } from "@/redux/hooks"
import { IconDiscountCheckFilled, IconKeyframe } from "@tabler/icons-react"
import Link from "next/link"

interface Props {
  index: number
}

const Card = {
  Grid: ({index}: Props) => {
    const {
      id, name, lastEditedTime, author: {name: authorName, premium, verified}
    } = useAppSelector(state => state.menuPublic)[index]
  
    return (
      <Link href={`/community/${id}`}>
        <div className="relative p-3 pb-11 bg-hero-pattern rounded-lg">
          <div className="flex items-center space-x-0.5 bg-white w-fit">
            {verified && <IconDiscountCheckFilled size='17px' className="text-cyan-400" />}
            <span className="text-sm text-neutral-800 font-bold truncate max-w-[100px]">
              {authorName}
            </span>
          </div>
          <i className="text-xs text-neutral-400 font-medium bg-white">
            {lastEditedTime}
          </i>
          {
            premium && 
            <div className="absolute top-3 right-0 p-1 bg-white rounded-l-md">
              <IconKeyframe size='17px' strokeWidth='2.7' className="text-stone-400" />
            </div>
          }
        </div>
        <div className="mt-1">
          <h2 className="text-sm text-neutral-800 font-bold truncate max-w-[150px]">
            {name}
          </h2>
        </div>
      </Link>
    )
  },
  List: ({index}: Props) => {
    const {
      id, name, lastEditedTime, author: {name: authorName, premium, verified}
    } = useAppSelector(state => state.menuPublic)[index]

    return (
      <Link href={`/community/${id}`}>
        <div className="flex space-x-3">
          <div className="relative p-11 bg-hero-pattern rounded-lg">
            {
              premium && 
              <div className="absolute top-3 right-0 p-1 bg-white rounded-l-md">
                <IconKeyframe size='17px' strokeWidth='2.7' className="text-stone-400" />
              </div>
            }
          </div>
          <div className="space-y-1">
            <h2 className="text-sm text-neutral-800 font-bold truncate max-w-[150px]">
              {name}
            </h2>
            <div className="flex items-end space-x-3 bg-white w-fit">
              <span className="text-xs text-neutral-500 font-medium">
                Bởi
              </span>
              <div className="flex items-center space-x-0.5">
                {verified && <IconDiscountCheckFilled size='17px' className="text-cyan-400" />}
                <span className="text-sm text-neutral-800 font-bold truncate max-w-[100px]">
                  {authorName}
                </span>
              </div>
            </div>
            <i className="text-xs text-neutral-400 font-medium bg-white">
              {lastEditedTime}
            </i>
          </div>
        </div>
      </Link>
    )
  }
}

export default Card