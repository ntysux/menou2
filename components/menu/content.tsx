'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { initMenu, removeMenu } from '@/redux/menu/slice'

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
    
    await fetch(`${url}/menu/api`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    })
  }
  
  return (
    <div className="w-screen max-w-5xl mx-auto">
      <div>
        <button>Thêm mới</button>
      </div>

      <div className='mt-9'>
        {
          menu.map((page: any, index: number) =>
            !page.deleted &&
            <div key={index} className='flex space-x-3'>
              <h2>{page.name}</h2>
              <button onClick={() => handleDelete(index, page.id)}>Xóa</button>
              <button>Sửa</button>
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