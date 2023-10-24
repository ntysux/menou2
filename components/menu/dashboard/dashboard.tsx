'use client'
import { IconRecycle, IconTrash } from '@tabler/icons-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { checkAllDeleted, checkAll, removeMulti, restoreMulti } from '@/redux/menu/slice'
import Colors from './colors'
import Checkbox from '../../checkbox'
import CUDialog from '../crud/dialog/dialog'
import { usePathname } from 'next/navigation'
import { url } from '@/utils/app.url'

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
  const pathname = usePathname(),
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
      <CUDialog>
        {setOpen => 
          <button
            onClick={() => setOpen(true)}
            className='
              p-3 px-9 rounded-lg shadow-custombox hover:shadow hover:shadow-neutral-200 transition-all duration-300
              text-sm text-neutral-400 font-medium hover:text-neutral-600
            '
          >
            Mới
          </button>
        }
      </CUDialog>
      {pathname === '/menu' 
        ?
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