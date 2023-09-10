'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { initMenu } from '@/redux/menu/slice'
import Card from './card'
import CardDialog from './card.dialog'
import { IconSoup } from '@tabler/icons-react'

export default function MenuContent({pages}: {pages: any}) {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(initMenu(pages))
    }
  }, [])

  return menu.length ? (
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
  ) : (
    <Empty />
  )
}

function Empty() {
  return (
    <div className="p-9 mt-3 space-y-5 text-center">
      <div className="flex justify-center">
        <IconSoup size='40px' className="text-neutral-200" />
      </div>
      <div>
        <h2 className="text-lg text-neutral-600 font-light tracking-wider">
          Món ăn được tạo sẽ hiển thị tại đây.
        </h2>
        <p className="text-sm text-neutral-400 font-light">
          Nhấn vào <span className="text-neutral-600 font-medium">Món ăn mới</span> để thêm mới món ăn.
        </p>
      </div>
    </div>
  )
}