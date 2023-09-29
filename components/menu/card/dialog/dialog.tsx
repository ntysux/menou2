'use client'
import { Dialog, Tab, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import CardActions from './actions'
import Header from './header'
import Content from './content'
import { useAppSelector } from '@/redux/hooks'

const transition = {
  overlay: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  },
  panel: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95"
  }
}

interface Props {
  children: ((setState: Dispatch<SetStateAction<boolean>>) => React.ReactNode)
  index: number
}

export default function CardDialog({children, index}: Props) {
  const [open, setOpen] = useState(false)
  const [actions, setActions] = useState<boolean>(false)
  const page = useAppSelector(state => state.menu)[index]
  const onClose = () => setOpen(false)

  return (
    <>
      {children(setOpen)}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child as={Fragment} {...transition.overlay}>
            <div className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child as={Fragment} {...transition.panel}>
                <Dialog.Panel className="relative w-screen max-w-4xl">
                  <Tab.Group as='div' className={
                    `${actions ? 'max-w-2xl' : 'max-w-full'} ${page.color ?? 'bg-white'}
                    relative hidden-scroll overflow-y-scroll h-screen max-h-96 w-full rounded-2xl transition-all`
                  }>
                    <Header
                      index={index}
                      actions={actions} 
                      setActions={setActions} 
                    />
                    <Content index={index} />
                  </Tab.Group>
                  {actions && <CardActions setActions={setActions} index={index} />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}