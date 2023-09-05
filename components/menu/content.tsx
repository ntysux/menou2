'use client'
import Link from 'next/link'
import { useAppSelector } from '@/redux/hooks'

export default function MenuContent() {
  const pages = useAppSelector(state => state.menu)
  
  return (
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
  )
}