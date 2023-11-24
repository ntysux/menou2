'use client'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { url } from '@/utils/app.url'
import { MenuGroup } from '@/redux/menu.group/types'
import { useAppDispatch } from '@/redux/hooks'
import { create } from '@/redux/menu.group/slice'

const tranlateX = {
  enter: "ease-out duration-300",
  enterFrom: "translate-x-5",
  enterTo: "translate-x-0",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 translate-x-0",
  leaveTo: "opacity-0 translate-x-5"
}

async function handleCreateApi(name: string): Promise<MenuGroup> {
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
  const [open, setOpen] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [submiting, setSubmiting] = useState(false)
  const dispatch = useAppDispatch()

  async function handleCreate() {
    setSubmiting(true)
    const newMenuGroupPage = await handleCreateApi(name)
    if (newMenuGroupPage) {
      dispatch(create(newMenuGroupPage))
      setSubmiting(false)
      setOpen(false)
    }
  }

  return (
    <>
      {children(setOpen)}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => false}>
          <div className="fixed inset-0 bg-white flex items-center justify-center">
            <button 
              onClick={() => setOpen(false)}
              className='absolute top-3 left-3'
            >
              <IconArrowNarrowLeft size='20px' className='text-neutral-800' />
            </button>
            <Transition.Child as={Fragment} {...tranlateX}>
              <Dialog.Panel className='flex flex-col'>
                <input 
                  value={name}
                  type="text"
                  placeholder='Tiêu đề'
                  onChange={e => setName(e.target.value)}
                  className='bg-neutral-200 p-2.5 w-screen max-w-xs rounded-lg text-sm text-neutral-800 font-bold focus:bg-white placeholder:font-medium'
                />
                <div className='text-right'>
                  <button 
                    disabled={submiting}
                    onClick={handleCreate}
                    className='w-fit mt-3 text-sm text-neutral-800 font-bold disabled:opacity-50'
                  >
                    {!submiting ? 'Tạo' : <Spin />}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

function Spin() {
  return <div className='p-0.5'>
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-800 border-r-white" />
  </div> 
}