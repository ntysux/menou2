import { useState, useRef } from 'react'
import { Disclosure } from '@headlessui/react'
import { useAppSelector } from '@/redux/hooks'

export default function ComboBox() {
  const 
    menu = useAppSelector(state => state.menu),
    [query, setQuery] = useState(''),
    inputRef = useRef<HTMLInputElement | null>(null)

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
              <input 
                ref={inputRef}
                value={query}
                type="text"
                placeholder='Tên món ăn'
                onChange={e => setQuery(e.target.value)}
                className='w-full outline-none p-3 bg-neutral-950/0 text-sm text-white font-medium placeholder:text-neutral-400'
              />
              <ul className='h-fit max-h-36 overflow-y-scroll hidden-scroll'>
                {
                  query &&
                  <li
                    onClick={() => {
                      close()
                      setQuery('')
                    }} 
                    className='p-3 cursor-pointer text-xs text-white font-bold hover:bg-neutral-700/75'
                  >
                    {query}
                  </li>
                }
                {
                  menu.filter(page => page.name.toLowerCase().includes(query.toLowerCase()) && !page.deleted).map((page, index) => 
                    <li
                      key={index}
                      onClick={() => {
                        close()
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