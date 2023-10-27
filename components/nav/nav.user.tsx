'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { init } from "@/redux/user/slice"
import { User } from "@/redux/user/types"
import { IconDiscountCheckFilled } from "@tabler/icons-react"
import { useEffect } from "react"

interface Props {
  user: User
}

export default function NavCardUser({user}: Props) {
  const dispatch = useAppDispatch()
  const {id, name, verified} = useAppSelector(state => state.user)

  useEffect(() => {
    if (!id) {
      dispatch(init(user))
    }
  }, [])

  return (
    <div className="flex items-center space-x-1">
      {verified && <IconDiscountCheckFilled size='17px' className="text-cyan-400" />}
      <p className="text-sm text-neutral-800 font-bold">
        {name}
      </p>
    </div>
  )
}