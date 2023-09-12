'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { initMenu } from '@/redux/menu/slice'
import Card from '@/components/menu/card'
import { Menu } from '@/redux/menu/types'

export default function MenuTrashContent({pages}: {pages: Menu[]}) {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(initMenu(pages))
    }
  }, [])

  return (
    <div className='mt-7 mb-20 grid grid-cols-1 gap-3 sm:mb-0 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {
        menu.map((page, index) =>
          page.deleted &&
          <Card key={index} index={index} />
        )
      }
    </div>
  )
}