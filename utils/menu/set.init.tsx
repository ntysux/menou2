'use client'

import { useAppDispatch } from "@/redux/hooks"
import { initMenu } from "@/redux/menu/slice"
import { useEffect } from "react"

export default function SetInitMenuPages({children, pages}: {children: React.ReactNode, pages: any}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initMenu(pages))
  }, [])

  return <>{children}</>
}