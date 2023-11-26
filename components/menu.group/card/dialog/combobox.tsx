import { useState, useRef, useEffect } from 'react'
import { Popover } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { listAdd } from '@/redux/menu.group/slice'
import { url } from '@/utils/app.url'

async function handleUpdateListApi(list: string[], id: string): Promise<{id: string}> {
  const response = await fetch(`${url}/menugroup/api/update/list`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({list, id})
  })
  return response.json()
}

export default function ComboBox({index}: {index: number}) {
  const 
    menu = useAppSelector(state => state.menu),
    {list, id} = useAppSelector(state => state.menuGroup)[index],
    [query, setQuery] = useState(''),
    inputRef = useRef<HTMLInputElement | null>(null),
    dispatch = useAppDispatch(),
    hasMounted = useRef(false)

  useEffect(() => {
    if (hasMounted.current) {
      handleUpdateListApi(list, id)
    } else {
      hasMounted.current = true
    }
  }, [list])

  return (
    <Popover className="relative mx-3">
      <Popover.Button className='outline-none cursor-text p-2.5 bg-neutral-200 w-full rounded-lg text-left text-sm text-neutral-600 font-medium'>
        Tên món ăn
      </Popover.Button>
      <Popover.Panel className="absolute top-0 z-10 bg-neutral-200 backdrop-blur-sm w-full rounded-lg overflow-hidden">
        {({open, close}) =>
          <>
            {open && inputRef.current?.focus()}
            <input 
              ref={inputRef}
              value={query}
              type="text"
              placeholder='Tên món ăn'
              onChange={e => setQuery(e.target.value)}
              className='p-2.5 w-full outline-none bg-neutral-200/0 text-sm text-neutral-700 font-medium placeholder:text-neutral-500/50'
            />
            <ul className='h-fit max-h-36 overflow-y-auto hidden-scroll divide-y divide-white'>
              {
                query &&
                <li
                  onClick={() => {
                    close()
                    dispatch(listAdd({item: query.trim().replace(/ {2,}/g, ' '), index}))
                    setQuery('')
                  }} 
                  className='p-2.5 cursor-pointer text-sm text-neutral-800 font-medium hover:bg-white/25'
                >
                  {query}
                </li>
              }
              {
                menu.filter(page => page.name.toLowerCase().includes(query.toLowerCase()) && !page.deleted).map((page, pageIndex) => 
                  <li
                    key={pageIndex}
                    onClick={() => {
                      close()
                      dispatch(listAdd({item: `${pageIndex}+${page.name}`, index}))
                      setQuery('')
                    }}
                    className='p-2.5 cursor-pointer text-sm text-neutral-800 font-medium hover:bg-white/25'
                  >
                    {page.name}
                  </li>
                )
              }
            </ul>
          </>
        }
      </Popover.Panel>
    </Popover>
  )
}