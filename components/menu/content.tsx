'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { init } from '@/redux/menu/slice'
import { IconChefHat } from '@tabler/icons-react'
import { Menu } from '@/redux/menu/types'
import Card from './card/card'
import CardDialog from './card/dialog/dialog'

export default function MenuContent({pages}: {pages: Menu[]}) {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(init(pages))
    }
  }, [])

  return [menu, pages].some(array => array.filter(page => !page.deleted).length) ? (
    <div className='mt-7 gap-3 mx-3 mb-20 grid grid-cols-1 sm:mx-0 sm:mb-0 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {
        menu.map((page, index) =>
          !page.deleted &&
          <CardDialog key={index} index={index}>
            {setOpen => <Card index={index} onClick={() => setOpen(true)} />}
          </CardDialog>
        )
      }
    </div>
  ) : <Empty />
}

function Empty() {
  return (
    <div className="p-9 mt-5 mx-3 space-y-5 text-center border border-dashed border-neutral-300 rounded-lg sm:mx-0">
      <div className="flex justify-center">
        <IconChefHat size='35px' className="text-neutral-300" />
      </div>
      <div>
        <h2 className="text-sm text-neutral-400 font-medium tracking-wider">
          Món ăn sẽ được hiển thị tại đây.
        </h2>
        <p className="text-xs text-neutral-400 font-medium">
          Nhấn vào <span className="text-neutral-500 font-bold">Món ăn mới</span> để thêm mới món ăn.
        </p>
      </div>
    </div>
  )
}