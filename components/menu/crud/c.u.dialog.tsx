'use client'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import UpdateForm from './update.form'
import CreateForm from './create.form'

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
  children: (setState: Dispatch<SetStateAction<boolean>>) => React.ReactNode
  index?: number
}

export default function CUDialog({children, index}: Props) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      {children(setOpen)}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child as={Fragment} {...transition.overlay}>
            <div className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-3 right-3 flex max-w-full">
                <Transition.Child as={Fragment} {...transition.translate}>
                  <Dialog.Panel className="pointer-events-auto relative w-screen sm:max-w-2xl max-w-xs">
                    <div className='p-7 pb-28 h-full overflow-y-scroll hidden-scroll bg-white rounded-2xl'>
                      {
                        index !== undefined 
                        ? <UpdateForm pageIndex={index} setOpen={setOpen} />
                        : <CreateForm setOpen={setOpen} />
                      }
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}