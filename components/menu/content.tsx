'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { initMenu, removeMenu } from '@/redux/menu/slice'
import CUDialog from './crud/c.u.dialog'

const url = process.env.NEXT_PUBLIC_APP_URL

export default function MenuContent({pages}: {pages: any}) {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  
  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(initMenu(pages))
    }
  }, [])

  async function handleDelete(index: number, id: string) {
    dispatch(removeMenu(index))
    
    await fetch(`${url}/menu/api/delete`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    })
  }

  return (
    <div className="w-screen max-w-5xl mx-auto">
      <div className='space-x-3'>
        <CUDialog>
          {setOpen => 
            <button onClick={() => setOpen(true)}>
              Thêm mới
            </button>
          }
        </CUDialog>
        <button>
          Xóa
        </button>
        <button>
          Đổi màu
        </button>
      </div>

      <div className='mt-9'>
        {
          menu.map((page: any, index: number) =>
            !page.deleted &&
            <div key={index} className='flex items-center space-x-3'>

              <input 
                type="checkbox" 
                className='appearance-none w-6 h-6 ring-1 ring-neutral-300 rounded-lg checked:ring-2 checked:ring-neutral-800' 
              />
              
              <h2>{page.name}</h2>
              <button onClick={() => handleDelete(index, page.id)}>Xóa</button>
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
            </div>
          )
        }
      </div>
    </div>
  )
}