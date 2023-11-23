'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { init as menuInit } from '@/redux/menu/slice'
import { init as userInit } from '@/redux/user/slice'
import MenuCard from '@/components/menu/card/card'
import { Menu } from '@/redux/menu/types'
import { IconTrashX } from '@tabler/icons-react'
import Empty from '../empty'
import { User } from '@/redux/user/types'
import { MenuGroup } from '@/redux/menu.group/types'
import { init as menuGroupInit } from '@/redux/menu.group/slice'
import MenuGroupCard from '../menu.group/card/card'

interface Props {
  results: {
    pages: Menu[]
    user: User
    groupPages: MenuGroup[]
  }
}

export default function TrashContent({results: {pages, user: userPage, groupPages}}: Props) {
  const 
    dispatch = useAppDispatch(),
    menu = useAppSelector(state => state.menu),
    user = useAppSelector(state => state.user),
    menuGroup = useAppSelector(state => state.menuGroup)

  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(menuInit(pages))
    }
    if (!user.id) {
      dispatch(userInit(userPage))
    }
    if (!menuGroup.length && groupPages.length) {
      dispatch(menuGroupInit(groupPages))
    }
  }, [])

  function MenuTrashContent() {
    return [menu, pages].some(array => array.filter(page => page.deleted).length) ? (
      <div className='grid grid-cols-1 gap-3 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2'>
        {menu.map((page, index) =>
          page.deleted && <MenuCard key={index} index={index} />
        )}
      </div>
    ) : (
      <Empty>
        <Empty.Icon>
          <IconTrashX size='35px' className="text-neutral-300" />
        </Empty.Icon>
        <Empty.Text className='mt-3 text-sm text-neutral-500 font-medium'>
          Các công thức đã xóa sẽ được hiển thị tại đây.
        </Empty.Text>
        <Empty.Text className='text-sm text-neutral-400'>
          Nhấn vào <span className="text-neutral-500 font-bold">Mới</span> để thêm công thức mới.
        </Empty.Text>
      </Empty>
    )
  }

  function MenuGroupTrashContent() {
    return [menuGroup, groupPages].some(array => array.filter(page => page.deleted).length) ? (
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {menuGroup.map((page, index) =>
          page.deleted && <MenuGroupCard key={index} index={index} />
        )}
      </div>
    ) : (
      <Empty>
        <Empty.Icon>
          <IconTrashX size='35px' className="text-neutral-300" />
        </Empty.Icon>
        <Empty.Text className='mt-3 text-sm text-neutral-500 font-medium'>
          Các nhóm đã xóa sẽ được hiển thị tại đây.
        </Empty.Text>
        <Empty.Text className='text-sm text-neutral-400'>
          Nhấn vào <span className="text-neutral-500 font-bold">Mới</span> để thêm nhóm mới.
        </Empty.Text>
      </Empty>
    )
  }

  return (
    <div className='space-y-9'>
      <div className='space-y-2.5'>
        <h2 className='text-xs text-neutral-400 font-bold tracking-wider'>
          Menu
        </h2>
        <MenuTrashContent />
      </div>
      <div className='space-y-2.5'>
        <h2 className='text-xs text-neutral-400 font-bold tracking-wider'>
          Nhóm
        </h2>
        <MenuGroupTrashContent />
      </div>
    </div>
  )
}