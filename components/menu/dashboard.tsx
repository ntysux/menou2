'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { checkAllDeleted, checkAll, removeMulti, restoreMulti } from '@/redux/menu/slice'
import CUDialog from './crud/c.u.dialog'
import Checkbox from '../checkbox'
import { IconTrash } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import Colors from './colors'

const url = process.env.NEXT_PUBLIC_APP_URL

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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({idList})
    })
  }
}

export default function Dashboard() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  
  const idList = menu.filter(menu => menu.checked).map(menu => menu.id)
  const allChecked = pathname === '/menu' 
    ? menu.filter(item => !item.deleted).every(item => item.checked) 
    : menu.filter(item => item.deleted).every(item => item.checked)
  const indeterminate = pathname === '/menu'
    ? menu.some(item => item.checked && !item.deleted) && !allChecked
    : menu.some(item => item.checked && item.deleted) && !allChecked

  return (
    <>
      <div className='flex space-x-3 items-center px-3 sm:px-0'>
        <CUDialog>
          {setOpen => 
            <button
              onClick={() => setOpen(true)}
              className='
                p-3 px-5 rounded-lg shadow-custombox hover:shadow hover:shadow-neutral-200 transition-all duration-300
                text-sm font-medium bg-gradient-to-r from-purple-400 to-sky-400 text-transparent bg-clip-text
              '
            >
              Thêm mới
            </button>
          }
        </CUDialog>
        {pathname === '/menu' 
          ?
          <div className='flex items-center space-x-7 p-3 px-5 rounded-lg shadow shadow-neutral-200'>
            <Checkbox
              indeterminate={indeterminate}
              checked={allChecked}
              onChange={e => dispatch(checkAll(e.target.checked))}
            />
            <div className='flex items-center space-x-3'>
              <button 
                onClick={() => {
                  dispatch(removeMulti())
                  handleDeleteMulti(idList)
                }}
                className='outline-none text-neutral-300 hover:text-neutral-400'
              >
                <IconTrash size='17px' strokeWidth='2.7' />
              </button>
              <Colors />
            </div>
          </div>
          :
          <div className='flex items-center space-x-5'>
            <Checkbox
              indeterminate={indeterminate}
              checked={allChecked}
              onChange={e => dispatch(checkAllDeleted(e.target.checked))}
            />
            <button 
              onClick={e => {
                dispatch(restoreMulti())
                handleRestoreMulti(idList)
              }}
              className='text-sm text-neutral-800 font-medium'
            >
              Khôi phục
            </button>
          </div>
        }
      </div>
    </>
  )
}