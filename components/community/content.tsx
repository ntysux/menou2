'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { init } from "@/redux/menu.public/slice"
import { MenuPublic } from "@/redux/menu.public/types"
import { useEffect } from "react"
import Card from "./card/card"

export default function Content({pages}: {pages: MenuPublic[]}) {
  const menuPublic = useAppSelector(state => state.menuPublic)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(!menuPublic.length && pages.length) {
      dispatch(init(pages))
    }
  }, [])

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {menuPublic.map((page, index) => 
        <Card key={index} page={page} />
      )}
    </div>
  )
}