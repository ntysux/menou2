'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { init } from "@/redux/menu.public/slice"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MenuPublicPreview } from "@/redux/menu.public/types"
import Card from "./card/card"

interface Props {
  pages: MenuPublicPreview[]
}

export default function Content({pages}: Props) {
  const 
    dispatch = useAppDispatch(),
    menuPublic = useAppSelector(state => state.menuPublic),
    search = useSearchParams().get('search')

  useEffect(() => {
    if(!menuPublic.length && pages.length) {
      dispatch(init(pages))
    }
  }, [])

  return (
    <div className="space-y-3">
      {
        search && 
        <h2 className="text-sm text-neutral-800 font-bold">
          {menuPublic.filter(page => page.name.toLowerCase().includes(search.toLowerCase())).length} kết quả cho {search}
        </h2>
      }
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-x-3 gap-y-7">
        {menuPublic.map((page, index) => 
          <Card key={index} index={index} />
        )}
      </div>
    </div>
  )
}