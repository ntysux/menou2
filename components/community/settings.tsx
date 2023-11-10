import { Dialog, Switch, Transition } from "@headlessui/react"
import { IconLayoutGrid, IconListDetails, IconSettings2, TablerIconsProps } from "@tabler/icons-react"
import { Fragment, useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setLayout } from "@/redux/community.settings/slice"

export default function Settings() {
  const [open, setOpen] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const dispatch = useAppDispatch()
  const {layout} = useAppSelector(state => state.communitySettings)

  const layoutOptions: ((props: TablerIconsProps) => JSX.Element)[] = [IconLayoutGrid, IconListDetails]

  useEffect(() => {
    if (layout !== null) {
      localStorage.setItem('layout', `${layout}`)
    }
  }, [layout])

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="outline-none p-3 rounded-lg shadow-custombox text-neutral-400 transition-all duration-300 hover:text-neutral-600 hover:shadow hover:shadow-neutral-200"
      >
        <IconSettings2 size='17px' strokeWidth='1' />
      </button>
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <div className="fixed inset-0">
            <div className="flex justify-center p-3">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="-translate-y-5"
                enterTo="translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-5"
              >
                <Dialog.Panel className="w-full max-w-xs rounded-xl bg-neutral-950/75 backdrop-blur-sm">
                  <div className="grid grid-cols-2 p-1">
                    {layoutOptions.map((Option, index) =>
                      <div 
                        key={index}
                        className="relative p-1 flex items-center justify-center cursor-pointer"
                        onClick={() => dispatch(setLayout(Boolean(index)))}
                      >
                        <Option 
                          size='20px'
                          strokeWidth='2'
                          className={`${Boolean(index) === layout ? 'text-white' : 'text-neutral-400'}`} 
                        />
                        {
                          layout === Boolean(index) && 
                          <motion.div 
                            layoutId='btn' 
                            className='absolute -z-50 inset-0 rounded-lg bg-neutral-600/75'
                          />
                        }
                      </div>  
                    )}
                  </div>
                  
                  <div className="mt-3 divide-y divide-neutral-600">
                    <div className="flex items-center justify-between p-3">
                      <span className="text-sm text-white font-medium">
                        Hiển thị tất cả các món ăn
                      </span>
                      <Switch
                        checked={!enabled}
                        onChange={() => setEnabled(!enabled)}
                        className={`
                          ${!enabled ? 'bg-neutral-600' : 'bg-neutral-700'} 
                          outline-none relative inline-flex py-0.5 px-2.5 items-center rounded-full
                        `}
                      >
                        <span
                          className={`
                            ${!enabled ? 'translate-x-2' : '-translate-x-2'} 
                            inline-block p-2 transform rounded-full bg-white transition duration-200
                          `}
                        />
                      </Switch>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span className="text-sm text-white font-medium">
                        Chỉ hiển thị các món ăn bởi tôi
                      </span>
                      <Switch
                        checked={enabled}
                        onChange={() => setEnabled(!enabled)}
                        className={`
                          ${enabled ? 'bg-neutral-600' : 'bg-neutral-700'} 
                          outline-none relative inline-flex py-0.5 px-2.5 items-center rounded-full
                        `}
                      >
                        <span
                          className={`
                            ${enabled ? 'translate-x-2' : '-translate-x-2'} 
                            inline-block p-2 transform rounded-full bg-white transition duration-200
                          `}
                        />
                      </Switch>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}