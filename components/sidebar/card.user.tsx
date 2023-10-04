'use client'
import { IconDiscountCheckFilled } from "@tabler/icons-react"
import ErrorMessage from "../error.message"
import { User } from "@/redux/user/types"
import { useAppSelector } from "@/redux/hooks"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { init } from "@/redux/user/slice"

export default function CardUser({result}: {result: {user?: User, error?: string}}) {
  const user = useAppSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.id && result.user) {
      dispatch(init(result.user))
    }
  }, [])

  return result.user ? (
    <div className="p-3 rounded-xl shadow shadow-neutral-200">
      <div className="flex items-center space-x-1 p-5">
        {result.user.verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
        <p className='text-sm text-neutral-800 font-bold'>
          {result.user.name}
        </p>
      </div>
    </div>
  ) : (
    <ErrorMessage>{result.error!}</ErrorMessage>
  )
}