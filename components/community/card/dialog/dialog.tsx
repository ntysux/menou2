import { MenuPublic } from "@/redux/menu.public/types"
import { Dialog, Transition } from "@headlessui/react"
import { IconArrowNarrowLeft, IconDiscountCheckFilled } from "@tabler/icons-react"
import { Dispatch, Fragment, SetStateAction, useState } from "react"

interface Props {
  children: (setOpen: Dispatch<SetStateAction<boolean>>) => React.ReactNode
  page: MenuPublic
}

export default function CardDialog({children, page}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {children(setOpen)}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => true}>
          <div className="fixed inset-0 overflow-y-scroll hidden-scroll overflow-x-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-x-5"
              enterTo="translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-5"
            >
              <Dialog.Panel className="min-h-screen h-[1000px] w-full bg-white">
                <div className="sticky top-0 z-50 p-3 flex items-center bg-white">
                  <button 
                    onClick={() => setOpen(false)} 
                    className="outline-none text-neutral-800"
                  >
                    <IconArrowNarrowLeft size='20px' />
                  </button>
                </div>
                <div className="mx-3 sm:w-screen sm:max-w-5xl sm:mx-auto">
                  <h1 className="text-lg text-neutral-800 font-bold">
                    {page.name}
                  </h1>
                  <div className="flex items-end space-x-3">
                    <i className="text-xs text-neutral-500 font-medium">
                      bởi
                    </i>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-neutral-800 font-bold">
                        {page.author.name}
                      </span>
                      {page.author.verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}