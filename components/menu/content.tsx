'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IconChefHat, IconClipboardList } from '@tabler/icons-react'
import Empty from '../empty'
import { Menu } from '@/redux/menu/types'
import { User } from '@/redux/user/types'
import { MenuGroup } from '@/redux/menu.group/types'
import { init as userInit } from '@/redux/user/slice'
import { init as menuInit } from '@/redux/menu/slice'
import { init as menuGroupInit } from '@/redux/menu.group/slice'
import MenuCard from './card/card'
import MenuDialog from './card/dialog/dialog'
// import MenuGroupCard from '../menu.group/card/card'
// import MenuGroupDialog from '../menu.group/card/dialog/dialog'

interface Props {
  results: {
    pages: Menu[]
    user: User
    groupPages: MenuGroup[]
  }
}

export default function Content({results: {pages, user: userPage, groupPages}}: Props) {
  const 
    dispatch = useAppDispatch(),
    menu = useAppSelector(state => state.menu),
    user = useAppSelector(state => state.user)
    // menuGroup = useAppSelector(state => state.menuGroup)

  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(menuInit(pages))
    }
    if (!user.id) {
      dispatch(userInit(userPage))
    }
    // if (!menuGroup.length && groupPages.length) {
    //   dispatch(menuGroupInit(groupPages))
    // }
  }, [])

  return (
    <div className='space-y-9'>
      <div className='space-y-2.5'>
        <h2 className='text-xs text-neutral-400 font-bold tracking-wider'>
          Menu
        </h2>
        {
          [menu, pages].some(array => array.filter(page => !page.deleted).length) 
          ? (
            <div className='grid grid-cols-1 gap-3 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2'>
              {menu.map((page, index) =>
                !page.deleted &&
                <MenuDialog key={index} index={index}>
                  {setOpen => <MenuCard index={index} onClick={() => setOpen(true)} />}
                </MenuDialog>
              )}
            </div>
          ) : (
            <Empty>
              <Empty.Icon>
                <IconChefHat size='35px' className="text-neutral-300" />
              </Empty.Icon>
              <Empty.Text className='mt-3 text-sm text-neutral-500 font-medium'>
                Các công thức sẽ được hiển thị tại đây.
              </Empty.Text>
              <Empty.Text className='text-sm text-neutral-400'>
                Nhấn vào <span className="text-neutral-500 font-bold">Mới</span> để thêm công thức mới.
              </Empty.Text>
            </Empty>
          )
        }
      </div>
      <div className='space-y-2.5'>
        <h2 className='text-xs text-neutral-400 font-bold tracking-wider'>
          Nhóm
        </h2>
        {/* {
          [menuGroup, groupPages].some(array => array.filter(page => !page.deleted).length) 
          ? (
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {menuGroup.map((page, index) =>
                !page.deleted && <div key={index}>{page.name}</div>
                // <MenuGroupDialog key={index} index={index}>
                //   {setOpen => <MenuGroupCard index={index} onClick={() => setOpen(true)} />}
                // </MenuGroupDialog>
              )}
            </div>
          ) : (
            <Empty>
              <Empty.Icon>
                <IconClipboardList size='35px' className="text-neutral-300" />
              </Empty.Icon>
              <Empty.Text className='mt-3 text-sm text-neutral-500 font-medium'>
                Các nhóm sẽ được hiển thị tại đây.
              </Empty.Text>
              <Empty.Text className='text-sm text-neutral-400'>
                Nhấn vào <span className="text-neutral-500 font-bold">Mới</span> để thêm nhóm mới.
              </Empty.Text>
            </Empty>
          )
        } */}
      </div>
    </div>
  )
}