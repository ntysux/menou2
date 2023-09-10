'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeColorMultiMenu, checkedMultiMenu, removeMultiMenu } from '@/redux/menu/slice'
import CUDialog from './crud/c.u.dialog'
import Checkbox from '../checkbox'

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
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  
  const idList = menu.filter(menu => menu.checked).map(menu => menu.id)
  const allChecked = menu.filter(item => !item.deleted).every(item => item.checked)
  const indeterminate = menu.some(item => item.checked) && !allChecked

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
        <div className='flex items-center space-x-3 p-2.5 px-5 rounded-lg shadow shadow-neutral-200'>
          <Checkbox
            indeterminate={indeterminate}
            checked={allChecked}
            onChange={e => dispatch(checkedMultiMenu(e.target.checked))}
          />
          <button 
            onClick={() => {
              dispatch(removeMultiMenu())
              handleDeleteMulti(idList)
            }}
            className='text-sm text-neutral-800 font-medium'
          >
            Xóa
          </button>
          <div className='flex space-x-3 p-1 bg-neutral-950/75 rounded-full'>
            {
              ['bg-rose-400', 'bg-teal-400', 'bg-purple-400', 'bg-white'].map((color, index) =>
                <button key={index} onClick={() => {
                  dispatch(changeColorMultiMenu(color))
                  handleChangeColorMulti(idList, color)
                }}>
                  <div className={`p-2 rounded-full ${color}`} />  
                </button>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}