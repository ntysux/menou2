import Editable from "@/components/editable/editable"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { rename } from "@/redux/menu.group/slice"
import { Dialog, Transition } from "@headlessui/react"
import { Dispatch, Fragment, SetStateAction, useState } from "react"

interface Props {
  index: number
  children: (setOpen: Dispatch<SetStateAction<boolean>>) => React.ReactNode
}

export default function CardDialog({index, children}: Props) {
  const 
    [open, setOpen] = useState(false),
    dispatch = useAppDispatch(),
    {name} = useAppSelector(state => state.menuGroup)[index]

  return (
    <>
      {children(setOpen)}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[1px]" />
          </Transition.Child>

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
                <Dialog.Panel className="w-full h-96 max-w-sm rounded-2xl bg-white overflow-hidden">
                  <Editable 
                    value={name} 
                    className="w-full p-3 flex justify-center"
                  >
                    <Editable.Preview className="text-sm text-neutral-800 font-bold max-w-[100px] truncate" />
                    <Editable.Input 
                      onChange={e => dispatch(rename({name: e.target.value, index}))} 
                      className="outline-neutral-800 text-sm text-neutral-800 font-medium selection:bg-neutral-300"
                    />
                  </Editable>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}