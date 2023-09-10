'use client'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { changeColorSingleMenu, checkedMenu, initMenu, removeMenu } from '@/redux/menu/slice'
import CUDialog from './crud/c.u.dialog'
import Card from './card'

const url = process.env.NEXT_PUBLIC_APP_URL

async function handleDelete(id: string) {
  await fetch(`${url}/menu/api/delete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id})
  })
}

async function handleChangeColorSingle(id: string, color: string) {
  await fetch(`${url}/menu/api/update/single/color`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, color})
  })
}

export default function MenuContent({pages}: {pages: any}) {
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)
  useEffect(() => {
    if (!menu.length && pages.length) {
      dispatch(initMenu(pages))
    }
  }, [])

  return (
    <div className='mt-7 mb-20 grid grid-cols-1 gap-3 sm:mb-0 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {
        menu.map((page: any, index: number) =>
          !page.deleted &&
          <Card key={index} page={page} index={index} />
            
            // <button onClick={() => {
            //   dispatch(removeMenu(index))
            //   handleDelete(page.id)
            // }}>
            //   Xóa
            // </button>
            // <CUDialog index={index}>
            //   {setOpen => 
            //     <button onClick={() => setOpen(true)}>
            //       Sửa
            //     </button>
            //   }
            // </CUDialog>
            // <Link href={`/menu/${page.id}`}>
            //   <button>Đầy đủ</button>
            // </Link>

            // {
            //   ['bg-rose-400', 'bg-teal-400', 'bg-purple-400', 'bg-white'].map((color, colorIndex) =>
            //     <button key={colorIndex} onClick={() => {
            //       dispatch(changeColorSingleMenu({color, index}))
            //       handleChangeColorSingle(page.id, color)
            //     }}>
            //       <div className={`p-2 rounded-full ${color} ring-1 ring-neutral-800`} />  
            //     </button>
            //   )
            // }
        )
      }
    </div>
  )
}