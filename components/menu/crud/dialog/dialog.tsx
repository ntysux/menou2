'use client'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Header from './header'
import Content from './content'
import { OpenDialog } from '../types/types'

const transition = {
  overlay: {
    enter: "ease-in-out duration-500",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in-out duration-500",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  },
  translate: {
    enter: "transform transition ease-in-out duration-700",
    enterFrom: "translate-x-full opacity-50",
    enterTo: "translate-x-0 opacity-100",
    leave: "transform transition ease-in-out duration-700",
    leaveFrom: "translate-x-0 opacity-100",
    leaveTo: "translate-x-full opacity-0"
  }
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
        <Dialog as="div" className="relative z-10 pointer-events-auto" onClose={() => false}>
          <div className="fixed inset-0">
            <div className="absolute inset-y-0 right-0 flex">
              <Transition.Child as={Fragment} {...transition.translate}>
                <Dialog.Panel className="relative bg-white rounded-none overflow-hidden w-screen sm:max-w-xl max-w-xs pointer-events-auto shadow shadow-neutral-300">
                  <Header setOpen={setOpen} />
                  <Content index={index} setOpen={setOpen} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}