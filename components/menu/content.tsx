'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { changeColorMultiMenu, changeColorSingleMenu, checkedMenu, checkedMultiMenu, initMenu, removeMenu, removeMultiMenu } from '@/redux/menu/slice'
import CUDialog from './crud/c.u.dialog'

const url = process.env.NEXT_PUBLIC_APP_URL

async function handleDelete(id: string) {
  await fetch(`${url}/menu/api/delete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id})
  })
}

async function handleDeleteMulti(idList: string[]) {
  await fetch(`${url}/menu/api/delete/multi`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({idList})
  })
}

async function handleChangeColorSingle(id: string, color: string) {
  await fetch(`${url}/menu/api/update/single/color`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, color})
  })
}

async function handleChangeColorMulti(idList: string[], color: string) {
  await fetch(`${url}/menu/api/update/multi/color`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({idList, color})
  })
}

export default function MenuContent({pages}: {pages: any}) {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  
  const idList = menu.filter(menu => menu.checked).map(menu => menu.id)

  const allChecked = menu.filter(item => !item.deleted).every(item => item.checked)
  const isIndeterminate = menu.some(item => item.checked) && !allChecked

  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(initMenu(pages))
    }
  }, [])

  return (
    <div className="w-screen max-w-5xl mx-auto">
      <div className='flex space-x-3 items-center'>
        <div className='relative bg-sky-200 p-3'>

          {isIndeterminate && <div className='absolute inset-0 p-1 px-3 rounded-full bg-neutral-500' />}
          
          <input 
            checked={allChecked}
            type="checkbox" 
            className='w-5 h-5 accent-neutral-800 absolute z-10 inset-0'
            onChange={e => dispatch(checkedMultiMenu(e.target.checked))}
          />
        </div>
        <CUDialog>
          {setOpen => 
            <button onClick={() => setOpen(true)}>
              Thêm mới
            </button>
          }
        </CUDialog>
        <button onClick={() => {
          dispatch(removeMultiMenu())
          handleDeleteMulti(idList)
        }}>
          Xóa
        </button>
        <div className='flex space-x-3'>
          {
            ['bg-rose-400', 'bg-teal-400', 'bg-purple-400', 'bg-white'].map((color, index) =>
              <button key={index} onClick={() => {
                dispatch(changeColorMultiMenu(color))
                handleChangeColorMulti(idList, color)
              }}>
                <div className={`p-2 rounded-full ${color} ring-1 ring-neutral-800`} />  
              </button>
            )
          }
        </div>
      </div>

      <div className='mt-9'>
        {
          menu.map((page: any, index: number) =>
            !page.deleted &&
            <div key={index} className={`flex items-center space-x-3 ${page.color}`}>
              <div>{index}</div>
              <input 
                type="checkbox" 
                checked={page.checked ?? false}
                className='w-5 h-5 accent-neutral-800'
                onChange={e => dispatch(checkedMenu({checked: e.target.checked, index}))}
              />
              
              <h2>{page.name}</h2>
              <button onClick={() => {
                dispatch(removeMenu(index))
                handleDelete(page.id)
              }}>
                Xóa
              </button>
              <CUDialog index={index}>
                {setOpen => 
                  <button onClick={() => setOpen(true)}>
                    Sửa
                  </button>
                }
              </CUDialog>
              <Link href={`/menu/${page.id}`}>
                <button>Đầy đủ</button>
              </Link>

              {
                ['bg-rose-400', 'bg-teal-400', 'bg-purple-400', 'bg-white'].map((color, colorIndex) =>
                  <button key={colorIndex} onClick={() => {
                    dispatch(changeColorSingleMenu({color, index}))
                    handleChangeColorSingle(page.id, color)
                  }}>
                    <div className={`p-2 rounded-full ${color} ring-1 ring-neutral-800`} />  
                  </button>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}