'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { init as menuInit } from '@/redux/menu/slice'
import { IconChefHat } from '@tabler/icons-react'
import { Menu } from '@/redux/menu/types'
import Card from './card/card'
import CardDialog from './card/dialog/dialog'
import Empty from '../empty'
import { User } from '@/redux/user/types'
import { init as userInit } from '@/redux/user/slice'

interface Props {
  results: {
    pages: Menu[]
    user: User
  }
}

export default function MenuContent({results: {pages, user: userPage}}: Props) {
  const 
    dispatch = useAppDispatch(),
    menu = useAppSelector(state => state.menu),
    user = useAppSelector(state => state.user)

  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(menuInit(pages))
    }
    if (!user.id) {
      dispatch(userInit(userPage))
    }
  }, [])

  return [menu, pages].some(array => array.filter(page => !page.deleted).length) ? (
    <div className='grid grid-cols-1 gap-3 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2'>
      {menu.map((page, index) =>
        !page.deleted &&
        <CardDialog key={index} index={index}>
          {setOpen => <Card index={index} onClick={() => setOpen(true)} />}
        </CardDialog>
      )}
    </div>
  ) : (
    <Empty>
      <Empty.Icon>
        <IconChefHat size='35px' className="text-neutral-300" />
      </Empty.Icon>
      <Empty.Text className='mt-3 text-sm text-neutral-500 font-medium'>
        Món ăn sẽ được hiển thị tại đây.
      </Empty.Text>
      <Empty.Text className='text-sm text-neutral-400'>
        Nhấn vào <span className="text-neutral-500 font-bold">Mới</span> để thêm mới món ăn.
      </Empty.Text>
    </Empty>
  )
}