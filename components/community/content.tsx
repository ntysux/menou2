'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { init as menuPublicInit } from "@/redux/menu.public/slice"
import { init as communitySettingsInit } from "@/redux/community.settings/slice"
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
    user = useAppSelector(state => state.user),
    {layout, display} = useAppSelector(state => state.communitySettings),
    search = useSearchParams().get('search')

  useEffect(() => {
    if (!menuPublic.length && pages.length) {
      dispatch(menuPublicInit(pages))
    }
    if (layout === null || display === null) {
      const localStorageLayout = localStorage.getItem('layout')
      const localStorageDisplay = localStorage.getItem('display')

      if (localStorageLayout && localStorageDisplay && (localStorageDisplay === 'global' || localStorageDisplay === 'personal')) {
        dispatch(communitySettingsInit({
          layout: localStorageLayout === 'true' ? true : false, 
          display: localStorageDisplay
        }))
      } else {
        dispatch(communitySettingsInit({layout: false, display: 'global'}))
        localStorage.setItem('layout', 'false')
        localStorage.setItem('display', 'global')
      }
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
      <div className={`grid grid-cols-1 ${!layout && 'sm:grid-cols-5'} gap-x-3 gap-y-5`}>
        {
          search && 
          menuPublic.map((page, index) =>
            page.name.toLowerCase().includes(search.toLowerCase())
            && (
              !layout
              ?
              <Card.Grid key={index} index={index} />
              :
              <Card.List key={index} index={index} />
            )
          )
        }
        {
          !search && 
          menuPublic.map((page, index) =>
            display === 'personal'
            ?
              page.uid === user.id &&
              (
                !layout
                ?
                <Card.Grid key={index} index={index} />
                :
                <Card.List key={index} index={index} />  
              )
            :
              (
                !layout
                ?
                <Card.Grid key={index} index={index} />
                :
                <Card.List key={index} index={index} />
              )
          )
        }
      </div>
    </div>
  )
}