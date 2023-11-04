import { useAppSelector } from "@/redux/hooks"
import { Dialog, Transition } from "@headlessui/react"
import { IconArrowNarrowLeft } from "@tabler/icons-react"
import { Dispatch, SetStateAction, useState, Fragment } from "react"
import Empty from "../empty"

interface Props {
  index: number
  children: (setOpen: Dispatch<SetStateAction<boolean>>) => React.ReactNode
}

export default function FullMenuPage({index, children}: Props) {
  const 
    {name, materials, required, steps} = useAppSelector(state => state.menu)[index],
    [open, setOpen] = useState(false)

  const fields = [
    {name: 'Nguyên liệu', data: materials},
    {name: 'Chuẩn bị', data: required},
    {name: 'Chế biến', data: steps},
  ]

  return (
    <>
      {children(setOpen)}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => false}>
          <div className="fixed inset-0 bg-white overflow-y-auto hidden-scroll">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-x-5"
              enterTo="translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-5"
            >
              <Dialog.Panel className="w-full min-h-screen">
                <div className="sticky top-0 z-10 p-3 flex bg-white">
                  <button 
                    onClick={() => setOpen(false)}
                    className="text-neutral-800 outline-none"
                  >
                    <IconArrowNarrowLeft size='20px' />
                  </button>
                </div>
                <div className="max-w-5xl sm:mx-auto mx-3">
                  <h1 className="text-2xl text-neutral-800 font-light">
                    {name}
                  </h1>
                  <div className="mt-7 space-y-3">
                    {fields.map(field =>
                      <div key={field.name}>
                        <h2 className="text-sm text-neutral-800 font-bold">
                          {field.name}
                        </h2>
                        {
                          !field.data &&
                          <Empty>Trống</Empty>
                        }
                        <ul>
                          {field.data?.split('|').map((item, index) =>
                            <li 
                              key={index}
                              className=" text-neutral-800"
                            >
                              {item}
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
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