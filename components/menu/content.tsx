'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { initMenu } from '@/redux/menu/slice'

export default function MenuContent({pages}: {pages: any}) {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(initMenu(pages))
    }
  }, [])
  
  return (
    <div className="w-screen max-w-5xl mx-auto">
      <div>
        <Link href='/menu/new'>
          <button>Thêm mới</button>
        </Link>
      </div>

      <div className='mt-9'>
        {
          menu.map((page: any, index: number) =>
            !page.deleted &&
            <div key={index} className='flex space-x-3'>
              <h2>{page.name}</h2>
              <button>Xóa</button>
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