'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { initMenu } from '@/redux/menu/slice'
import Card from './card'
import CardDialog from './card.dialog'

export default function MenuContent({pages}: {pages: any}) {
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
          !page.deleted &&
          <CardDialog key={index} index={index}>
            {setOpen => <Card index={index} onClick={() => setOpen(true)} />}
          </CardDialog>
        )
      }
    </div>
  )
}