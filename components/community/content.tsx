'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { init } from "@/redux/menu.public/slice"
import { MenuPublicPreview } from "@/redux/menu.public/types"
import { useEffect } from "react"
import Card from "./card"
import { useSearchParams } from "next/navigation"

export default function Content({pages}: {pages: MenuPublicPreview[]}) {
  const search = useSearchParams().get('search')
  const menuPublic = useAppSelector(state => state.menuPublic)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!menuPublic.length && pages.length) {
      dispatch(init(pages))
    }
  }, [])

  return (
    <div className="space-y-3">
      {
        search 
        && 
        <h2 className="text-sm text-neutral-800 font-bold">
          {menuPublic.filter(page => page.name.toLowerCase().includes(search.toLowerCase())).length} kết quả cho {search}
        </h2>
      }
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-x-3 gap-y-7">
        {menuPublic.map((page, index) => 
          search 
          ? page.name.toLowerCase().includes(search.toLowerCase()) && <Card key={index} page={page} />
          : <Card key={index} page={page} />
        )}
      </div>
    </div>
  )
}