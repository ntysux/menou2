import { useState, useRef, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IconMinus } from '@tabler/icons-react'
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
    <div className='relative mx-3'>
      <Disclosure>
        <Disclosure.Button className="outline-none cursor-text p-3 w-full text-left text-sm text-neutral-300 font-medium">
          Tên món ăn
        </Disclosure.Button>
        <Disclosure.Panel className="absolute top-0 bg-neutral-950/75 backdrop-blur-sm w-full rounded-xl overflow-hidden">
          {({open, close}) => 
            <>
              {open && inputRef.current?.focus()}
              <div className='flex items-center'>
                <input 
                  ref={inputRef}
                  value={query}
                  type="text"
                  placeholder='Tên món ăn'
                  onChange={e => setQuery(e.target.value)}
                  className='w-full outline-none p-3 bg-neutral-950/0 text-sm text-white font-medium placeholder:text-neutral-400'
                />
                <IconMinus 
                  size='16px' 
                  strokeWidth='3' 
                  className='mx-3 text-white cursor-pointer' 
                  onClick={() => close()}
                />
              </div>
              <ul className='h-fit max-h-36 overflow-y-scroll hidden-scroll'>
                {
                  query &&
                  <li
                    onClick={() => {
                      close()
                      dispatch(listAdd({item: query, index}))
                      setQuery('')
                    }} 
                    className='p-3 cursor-pointer text-xs text-white font-bold hover:bg-neutral-700/75'
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
                        dispatch(listAdd({item: `${page.id}+${page.name}`, index}))
                        setQuery('')
                      }}
                      className='p-3 cursor-pointer text-xs text-white font-bold hover:bg-neutral-700/75'
                    >
                      {page.name}
                    </li>
                  )
                }
              </ul>
            </>
          }
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}