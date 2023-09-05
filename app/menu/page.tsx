'use client'

import { useAppSelector } from '@/redux/hooks'
import Link from 'next/link'

export default function MenuPage() {
  const pages = useAppSelector(state => state.menu)

  return (
    <>
      <div className="w-screen max-w-5xl mx-auto">
        <div>
          <Link href='/menu/new'>
            <button>Thêm mới</button>
          </Link>
        </div>

        <div className='mt-9'>
          {
            pages.map((page: any, index: number) =>
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
    </>
  )
}