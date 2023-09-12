'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeColorMultiMenu, checkedMultiDeletedMenu, checkedMultiMenu, removeMultiMenu, restoreMultiMenu } from '@/redux/menu/slice'
import CUDialog from './crud/c.u.dialog'
import Checkbox from '../checkbox'
import { IconTrash } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'

const url = process.env.NEXT_PUBLIC_APP_URL
async function handleDeleteMulti(idList: string[]) {
  await fetch(`${url}/menu/api/delete/multi`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({idList})
  })
}
async function handleChangeColorMulti(idList: string[], color: string) {
  await fetch(`${url}/menu/api/update/multi/color`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({idList, color})
  })
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
      <div className='flex space-x-3 items-center'>
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
          <div className='flex items-center space-x-7 p-2.5 px-5 rounded-lg shadow shadow-neutral-200'>
            <Checkbox
              indeterminate={indeterminate}
              checked={allChecked}
              onChange={e => dispatch(checkedMultiMenu(e.target.checked))}
            />
            <div className='flex items-center space-x-3'>
              <button 
                onClick={() => {
                  dispatch(removeMultiMenu())
                  handleDeleteMulti(idList)
                }}
                className='text-neutral-300 hover:text-neutral-400'
              >
                <IconTrash size='17px' strokeWidth='2.7' />
              </button>
              <div className='flex space-x-2'>
                {[
                  {color: 'bg-rose-100', face: 'bg-rose-400'}, 
                  {color: 'bg-teal-100', face: 'bg-teal-400'}, 
                  {color: 'bg-purple-100', face: 'bg-purple-400'},
                  {color: 'bg-white', face: 'bg-white'}
                ].map((colorTheme, index) =>
                  <button key={index} onClick={() => {
                    dispatch(changeColorMultiMenu(colorTheme.color))
                    handleChangeColorMulti(idList, colorTheme.color)
                  }}>
                    <div className={`p-2 rounded-full ring-2 ring-neutral-600 ${colorTheme.face}`} />  
                  </button>
                )}
              </div>
            </div>
          </div>
          :
          <div className='flex items-center space-x-5'>
            <Checkbox
              indeterminate={indeterminate}
              checked={allChecked}
              onChange={e => dispatch(checkedMultiDeletedMenu(e.target.checked))}
            />
            <button onClick={e => dispatch(restoreMultiMenu())}>
              khôi phục
            </button>
          </div>
        }
      </div>
    </>
  )
}