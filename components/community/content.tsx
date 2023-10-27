'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { init } from "@/redux/menu.public/slice"
import { useEffect } from "react"
import Card from "./card/card"
import { useSearchParams } from "next/navigation"
import CardDialog from "./card/dialog/dialog"
import { MenuPublic } from "@/redux/menu.public/types"

export default function Content({pages}: {pages: MenuPublic[]}) {
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
          search 
          ? page.name.toLowerCase().includes(search.toLowerCase()) && 
            <CardDialog page={page} key={index}>
              {setOpen =>
                <Card page={page} onClick={() => setOpen(true)} />
              }
            </CardDialog>
          : <CardDialog page={page} key={index}>
              {setOpen =>
                <Card page={page} onClick={() => setOpen(true)} />
              }
            </CardDialog>
        )}
      </div>
    </div>
  )
}