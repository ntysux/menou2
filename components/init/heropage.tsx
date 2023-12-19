'use client'

import { Tab } from "@headlessui/react"
import { motion } from "framer-motion"
import { IconCopyright } from "@tabler/icons-react"
import Start from "./tabs/start"
import SignupDialog from "../auth/signup/dialog"
import Support from "./tabs/support"

const tabs: string[] = ['Bắt đầu', 'Hỗ trợ', 'Đánh giá']

export default function HeroPage() {
  return (
    <Tab.Group>
      <div className="bg-dots min-h-screen">
        <div className="min-h-screen w-screen max-w-7xl mx-auto flex flex-col justify-between">
          <div className="flex items-center justify-between py-9 px-3">
            <h1 className="text-sm text-neutral-800 font-bold tracking-widest">
              MENOÚ
            </h1>
            <Tab.List className='flex items-center gap-9'>
              {({selectedIndex}) =>
                <>
                  {tabs.map((tab, index) =>
                    <Tab 
                      key={index} 
                      className='outline-none text-sm text-neutral-800 font-medium relative'
                    >
                      {tab}
                      {selectedIndex === index &&
                        <motion.div 
                          layoutId="btn" 
                          className="absolute -bottom-1 p-[1px] bg-neutral-800 w-full rounded-full" 
                        />
                      }
                    </Tab>
                  )}
                </>
              }
            </Tab.List>
            <SignupDialog>
              {setOpen => 
                <button
                  onClick={() => setOpen(true)}
                  className="outline-none text-sm text-neutral-800 font-medium"
                >
                  Tạo tài khoản
                </button>
              }
            </SignupDialog>
          </div>
          <Tab.Panels>
            <Tab.Panel className='outline-none'>
              {({selected}) => <Start selected={selected} />}
            </Tab.Panel>
            <Tab.Panel>
              <Support />
            </Tab.Panel>
            <Tab.Panel>
              
            </Tab.Panel>
          </Tab.Panels>
          <div className="flex items-center justify-between py-9">
            <div className="flex items-center gap-1 text-sm text-neutral-500 font-medium">
              Bản quyền <span><IconCopyright size='15px' /></span> thuộc về Menoú
            </div>
            <div className="sm:flex hidden items-center gap-3">
              {['Quyền riêng tư', 'Điều khoản', 'Pháp lý'].map((option, index) =>
                <button key={index} className="text-sm text-neutral-800 font-medium hover:underline hover:underline-offset-1">
                  {option}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Tab.Group>
  )
}