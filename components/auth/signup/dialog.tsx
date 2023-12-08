'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, Dispatch, SetStateAction } from 'react'
import Signup from './form'

interface Props {
  children: (setOpen: Dispatch<SetStateAction<boolean>>) => React.ReactNode
}

export default function SignupDialog({children}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  
  return (
    <>
      {children(setOpen)}
      <Transition 
        as={Fragment}
        show={open} 
      >
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={() => false}
        >
          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child 
                as={Fragment} 
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md rounded-2xl overflow-hidden bg-neutral-950/75 backdrop-blur-sm">
                  <Signup setOpen={setOpen} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}