'use client'
import { Dialog, Tab, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { motion } from "framer-motion"
import { IconChevronLeft, IconPencil} from '@tabler/icons-react'
import { useAppSelector } from "@/redux/hooks"
import Checkbox from '../../checkbox'
import CardActions from './card.actions'

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
  const onClose = () => setOpen(false)
  const page = useAppSelector(state => state.menu)[index]
  const [actions, setActions] = useState<boolean>(false)
  const materials = page.materials?.split('|')
  const required = page.required?.split('|')
  const steps = page.steps?.split('|')
  const [materialsChecked, setMaterialsChecked] = useState<boolean[]>(Array(materials?.length).fill(false))
  
  function handleMaterialsChecked(isChecked: boolean, index: number) {
    setMaterialsChecked([...materialsChecked.fill(isChecked, index, index + 1)])
  }

  const tabs: string[] = ['Nguyên liệu', 'Chuẩn bị', 'Chế biến']

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
                  <div className={
                    `${actions ? 'max-w-2xl' : 'max-w-full'} 
                    relative hidden-scroll overflow-y-scroll h-screen max-h-96 w-full rounded-2xl bg-white transition-all`
                  }>
                    <Tab.Group>
                      <div className="sticky top-0 p-7 bg-white flex items-center justify-between">
                        <Tab.List className="flex space-x-5">
                          {tabs.map(tab => (
                            <Tab 
                              key={tab}
                              className={({selected}) => `${selected
                                ? 'text-neutral-800 font-medium'
                                : 'text-neutral-400 font-normal'}
                                relative text-sm outline-none
                              `}
                            >
                              {({selected}) => (
                                <>
                                  <Dialog.Title as="h4">{tab}</Dialog.Title>
                                  {selected && <UnderLine />}
                                </>
                              )}
                            </Tab>
                          ))}
                        </Tab.List>

                        <button 
                          className={`
                            ${actions ? 'rotate-180 text-neutral-800' : 'rotate-0 text-neutral-400'} 
                            transition-all duration-500
                          `}
                          onClick={() => setActions(!actions)}
                        >
                          <IconChevronLeft 
                            size='20px' 
                            strokeWidth='3'
                          />
                        </button>
                      </div>
                      <Tab.Panels className="p-6 pt-3">
                        {[materials, required, steps].map((tabPanel, key) => (
                          <Tab.Panel key={key}>
                            {
                              tabPanel ?
                                <motion.div
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -10, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ul>
                                    {tabPanel?.map((line, index) => (
                                      <li
                                        key={index}
                                        className="p-1 text-neutral-800 text-sm font-medium"
                                      >
                                        {!key ?
                                          <div className='flex items-center space-x-3'>
                                            <Checkbox 
                                              checked={materialsChecked[index]} 
                                              onChange={e => handleMaterialsChecked(e.target.checked, index)}
                                            />
                                            <span className={`${materialsChecked[index] && 'line-through text-neutral-400/75'}`}>
                                              {line}
                                            </span>
                                          </div>
                                        :
                                          line
                                        }
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              :
                                <div className='space-y-1 p-3 text-center'>
                                  <h3 className='text-neutral-500 font-medium'>Trống</h3>
                                  <div className='flex justify-center space-x-1 text-xs font-medium text-neutral-400'>
                                    <span>Nhấn vào</span> 
                                    <IconPencil size='17px' strokeWidth='2.7' className='text-neutral-500' />
                                    <span>để thêm mới.</span>
                                  </div>
                                </div>
                            }
                          </Tab.Panel>
                        ))}
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
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

function UnderLine() {
  return <motion.div layoutId="under" className="absolute -bottom-2 left-0 right-0 p-[1px] rounded-full bg-neutral-800" />
}