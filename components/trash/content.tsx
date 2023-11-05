'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { init } from '@/redux/menu/slice'
import Card from '@/components/menu/card/card'
import { Menu } from '@/redux/menu/types'
import { IconTrashX } from '@tabler/icons-react'
import Empty from '../empty'

export default function MenuTrashContent({pages}: {pages: Menu[]}) {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(init(pages))
    }
  }, [])

  return [menu, pages].some(array => array.filter(page => page.deleted).length) ? (
    <div className='grid grid-cols-1 gap-3 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2'>
      {
        menu.map((page, index) =>
          page.deleted &&
          <Card key={index} index={index} />
        )
      }
    </div>
  ) : (
    <Empty>
      <Empty.Icon>
        <IconTrashX size='35px' className="text-neutral-300" />
      </Empty.Icon>
      <Empty.Text className='mt-3 text-sm text-neutral-500 font-medium'>
        Món ăn đã xóa sẽ được hiển thị tại đây.
      </Empty.Text>
      <Empty.Text className='text-sm text-neutral-400'>
        Nhấn vào <span className="text-neutral-500 font-bold">Mới</span> để thêm mới món ăn.
      </Empty.Text>
    </Empty>
  )
}