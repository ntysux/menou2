import { cookies } from 'next/headers'
import Link from 'next/link'

const url = process.env.NEXT_PUBLIC_APP_URL

async function getData() {
  const cookie = cookies().get('token')
  
  const res = await fetch(`${url}/menu/api`, {
    headers: {cookie: `token=${cookie?.value}`}
  })

  const rs = await res.json()
  return rs
}

export default async function MenuPage() {
  const rs = await getData()

  return !rs.error ? (
    <>
      <div className="w-screen max-w-5xl mx-auto">
        <div>
          <Link href='/menu/new'>
            <button>Thêm mới</button>
          </Link>
        </div>

        <div className='mt-9'>
          {
            rs.menuPages.map((page: any, index: number) =>
              <div key={index} className='flex space-x-3'>
                <h2>{page.name}</h2>
                <button>Xóa</button>
                <button>Sửa</button>
              </div>
            )
          }
        </div>
      </div>
    </>
  ) : (
    <>Lỗi: {rs.error}</>
  )
}