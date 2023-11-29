'use client'
import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import { Popover, Transition } from '@headlessui/react'
import { IconGripHorizontal, IconRecycle, IconSwipe, IconTrash } from '@tabler/icons-react'
import Colors from './colors'
import { url } from '@/utils/app.url'
import Checkbox from '../../checkbox'
import CUDialog from '../crud/dialog/dialog'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import CreateMenuGroup from '@/components/menu.group/crud/create.dialog'
import { checkAllDeleted, checkAll, removeMulti, restoreMulti } from '@/redux/menu/slice'

async function handleDeleteMulti(idList: string[]) {
  if (idList.length) {
    await fetch(`${url}/menu/api/delete/multi`, {
      method: 'POST',
      body: JSON.stringify({idList})
    })
  }
}
async function handleRestoreMulti(idList: string[]) {
  if (idList.length) {
    await fetch(`${url}/menu/api/update/multi/restore`, {
      method: 'POST',
      body: JSON.stringify({idList})
    })
  }
}

export default function Dashboard() {
  const 
    pathname = usePathname(),
    dispatch = useAppDispatch(),
    menu = useAppSelector(state => state.menu),
    idList = menu.filter(menu => menu.checked).map(menu => menu.id)
  
  const allChecked = pathname === '/menu' 
    ? menu.filter(item => !item.deleted).every(item => item.checked) 
    : menu.filter(item => item.deleted).every(item => item.checked)

  const indeterminate = pathname === '/menu'
    ? menu.some(item => item.checked && !item.deleted) && !allChecked
    : menu.some(item => item.checked && item.deleted) && !allChecked

  function handleDeleteAndDispatch() {
    dispatch(removeMulti())
    handleDeleteMulti(idList)
  }

  function handleRestoreAndDispatch() {
    dispatch(restoreMulti())
    handleRestoreMulti(idList)
  }

  return (
    <div className='flex space-x-3'>
      <Popover className="relative">
        <Popover.Button className='p-3 px-9 outline-none rounded-lg shadow-custombox hover:shadow hover:shadow-neutral-200 transition-all duration-300 text-sm text-neutral-400 font-medium hover:text-neutral-600'>
          Mới
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="translate-y-1"
          enterTo="translate-y-0"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-[210px] flex flex-col bg-neutral-950/75 backdrop-blur-sm rounded-sm overflow-hidden divide-y divide-neutral-600">
            <CUDialog>
              {setOpen => 
                <button 
                  onClick={() => setOpen(true)}
                  className='p-2.5 flex justify-between items-center text-xs text-white hover:bg-neutral-600'
                >
                  <IconSwipe size='17px' className='text-neutral-400' />
                  <span>Menu</span>
                </button>
              }
            </CUDialog>
            <CreateMenuGroup>
              {setOpen =>
                <button
                  onClick={() => setOpen(true)}
                  className='p-2.5 flex justify-between items-center text-xs text-white hover:bg-neutral-600'
                >
                  <IconGripHorizontal size='17px' className='text-neutral-400' />
                  <span>Nhóm</span>
                </button>
              }
            </CreateMenuGroup>
          </Popover.Panel>
        </Transition>
      </Popover>
      {pathname === '/menu' 
        ?
        // Menu
        <div className='flex items-center space-x-7 px-7 rounded-lg shadow shadow-neutral-200'>
          <Checkbox
            indeterminate={indeterminate}
            checked={allChecked}
            onChange={e => dispatch(checkAll(e.target.checked))}
          />
          <div className='flex items-center space-x-3'>
            <button
              onClick={handleDeleteAndDispatch}
              className='outline-none text-neutral-300 hover:text-neutral-400'
            >
              <IconTrash size='17px' strokeWidth='2.7' />
            </button>
            <Colors />
          </div>
        </div>
        :
        // Trash
        <div className='flex items-center space-x-7 px-7 rounded-lg shadow shadow-neutral-200'>
          <Checkbox
            indeterminate={indeterminate}
            checked={allChecked}
            onChange={e => dispatch(checkAllDeleted(e.target.checked))}
          />
          <button 
            onClick={handleRestoreAndDispatch}
            className='outline-none text-neutral-300 hover:text-neutral-400'
          >
            <IconRecycle size='17px' strokeWidth='2.7' />
          </button>
        </div>
      }
    </div>
  )
}