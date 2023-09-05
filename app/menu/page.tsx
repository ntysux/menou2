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
  const pages = await getData()

  return !pages.error ? (
    <>
      <div className="w-screen max-w-5xl mx-auto">
        <div>
          <Link href='/menu/new'>
            <button>Thêm mới</button>
          </Link>
        </div>

        <div className='mt-9'>
          data here
        </div>
      </div>
    </>
  ) : (
    <>Lỗi: {pages.error}</>
  )
}