'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { init } from "@/redux/menu.public/slice"
import { MenuPublic } from "@/redux/menu.public/types"
import { useEffect } from "react"
import Card from "./card/card"
import { useSearchParams } from "next/navigation"

export default function Content({pages}: {pages: MenuPublic[]}) {
  const search = useSearchParams().get('search')
  const menuPublic = useAppSelector(state => state.menuPublic)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(!menuPublic.length && pages.length) {
      dispatch(init(pages))
    }
  }, [])

  return search ? (
    <div className="space-y-3">
      <h2 className="text-sm text-neutral-800 font-bold">
        {menuPublic.filter(page => page.name.toLowerCase().includes(search.toLowerCase())).length} kết quả
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {menuPublic.map((page, index) => 
          page.name.toLowerCase().includes(search.toLowerCase()) && <Card key={index} page={page} />
        )}
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-3">
      {menuPublic.map((page, index) => 
        <Card key={index} page={page} />
      )}
    </div>
  )
}