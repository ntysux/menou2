'use client'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Header from './header'
import Content from './content'
import { OpenDialog } from '../types/types'

const tranlateX = {
  enter: "ease-out duration-300",
  enterFrom: "translate-x-5",
  enterTo: "translate-x-0",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 translate-x-0",
  leaveTo: "opacity-0 translate-x-5"
}

interface Props {
  children: (setState: OpenDialog) => React.ReactNode
  index?: number
}

export default function CUDialog({children, index}: Props) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      {children(setOpen)}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => false}>
          <div className="fixed inset-0 bg-white overflow-y-auto hidden-scroll">
            <Transition.Child as={Fragment} {...tranlateX}>
              <Dialog.Panel className="w-screen h-screen">
                <Header setOpen={setOpen} />
                <Content index={index} setOpen={setOpen} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}