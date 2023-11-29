'use client'
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { url } from '@/utils/app.url'
import { MenuGroup } from '@/redux/menu.group/types'
import { useAppDispatch } from '@/redux/hooks'
import { create } from '@/redux/menu.group/slice'

async function createMenuGroupPage(name: string): Promise<MenuGroup> {
  const response = await fetch(`${url}/menugroup/api/create`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name})
  })
  return response.json()
}

interface Props {
  children: (setState: Dispatch<SetStateAction<boolean>>) => React.ReactNode
  index?: number
}

export default function CreateMenuGroup({children}: Props) {
  const 
    dispatch = useAppDispatch(),
    [open, setOpen] = useState<boolean>(false),
    [name, setName] = useState(''),
    [submiting, setSubmiting] = useState(false),
    inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    open && setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  async function handleCreateNewMenuGroupPage() {
    setSubmiting(true)
    const newMenuGroupPage = await createMenuGroupPage(
      name.trim()
      ? name.trim().replace(/ {2,}/g, ' ')
      : 'Không tiêu đề'
    )
    if (newMenuGroupPage) {
      dispatch(create(newMenuGroupPage))
      setOpen(false)
      setSubmiting(false)
      setName('')
    }
  }

  return (
    <>
      {children(setOpen)}
      <Transition.Root 
        show={open} 
        as={Fragment}
      >
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={() => false}
        >
          <div className="fixed inset-0">
            <div className='min-h-screen flex items-center justify-center bg-white'>
              <button 
                onClick={() => setOpen(false)}
                className='absolute top-3 left-3 z-10'
              >
                <IconArrowNarrowLeft 
                  size='20px' 
                  className='text-neutral-800' 
                />
              </button>
              <Transition.Child 
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="translate-x-5"
                enterTo="translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-5"
              >
                <Dialog.Panel className='w-full flex items-center justify-center min-h-screen bg-white'>
                  <div>
                    <input
                      ref={inputRef}
                      value={name}
                      type="text"
                      placeholder='Tiêu đề'
                      onChange={e => setName(e.target.value)}
                      className='outline-none border-2 border-neutral-800 p-2.5 w-screen max-w-xs rounded-lg text-sm text-neutral-800 font-bold placeholder:font-medium'
                    />
                    <div className='flex items-center justify-end mt-3'>
                      <button 
                        disabled={submiting}
                        onClick={handleCreateNewMenuGroupPage}
                        className='w-fit text-sm text-neutral-800 font-bold'
                      >
                        {!submiting ? 'Tạo' : <Spin />}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

function Spin() {
  return (
    <div className='p-1'>
      <div className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-800 border-r-white/0" />
    </div>
  )
}