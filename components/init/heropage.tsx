'use client'

import { useState } from "react"
import { Tab } from "@headlessui/react"
import { Variants, motion } from "framer-motion"
import { IconArrowNarrowRight, IconDeviceDesktop, IconDeviceIpadHorizontal, IconDeviceMobile, TablerIconsProps } from "@tabler/icons-react"

interface EffectType {
  container: Variants
  item: Variants
}

interface Effect {
  x: EffectType
  y: EffectType
  scale: EffectType
}

const effect: Effect = {
  x: {
    container: {
      visible: {
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.1
        }
      }
    },
    item: {
      hidden: {x: -13, opacity: 0},
      visible: {x: 0, opacity: 1}
    }
  },
  y: {
    container: {
      visible: {
        transition: {
          delayChildren: 0.7,
          staggerChildren: 0.3
        }
      }
    },
    item: {
      hidden: {height: 0, opacity: 0},
      visible: {height: 'fit-content', opacity: 1}
    }
  },
  scale: {
    container: {
      visible: {
        transition: {
          delayChildren: 0.7,
          staggerChildren: 0.1
        }
      }
    },
    item: {
      hidden: {scale: 0.7, opacity: 0},
      visible: {scale: 1, opacity: 1}
    }
  },
}

const tabs: string[] = ['Bắt đầu', 'Hỗ trợ', 'Đánh giá']
const devices: ((props: TablerIconsProps) => JSX.Element)[] = [
  IconDeviceDesktop,
  IconDeviceIpadHorizontal,
  IconDeviceMobile
]

export default function HeroPage() {
  const [deviceSelected, setDeviceSelected] = useState(0)

  return (
    <>
      <Tab.Group>
        <div className="polka min-h-screen">
          <div className="min-h-screen w-screen max-w-7xl mx-auto flex flex-col justify-between">
            <div className="flex items-center justify-between py-9">
              <h1 className="text-neutral-800 font-bold tracking-widest">
                Menoú
              </h1>
              <Tab.List className='flex items-center gap-9'>
                {({selectedIndex}) =>
                  <>
                    {tabs.map((tab, index) =>
                      <Tab key={index} className='outline-none text-sm text-neutral-800 font-medium relative'>
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
              <button className="outline-none text-sm text-neutral-800 font-medium">
                Tạo tài khoản
              </button>
            </div>

            <Tab.Panels>
              <Tab.Panel className='outline-none'>
                {({selected}) =>
                  <motion.div 
                    className='grid grid-cols-5 gap-1'
                    variants={effect.y.container}
                    initial="hidden"
                    animate={selected ? 'visible' : 'hidden'}
                  >
                    <motion.div 
                      className="col-span-3 bg-neutral-950/75 h-fit rounded-2xl"
                      variants={effect.y.item}
                    >
                      <div className="p-9">
                        <h2 className="text-lg text-white font-medium">
                          {`M'`}
                        </h2>
                      </div>
                      <div className="p-20 pt-0">
                        <p className="text-neutral-300">
                          Tạo các công thức nấu ăn và thực đơn của riêng bạn.
                        </p>
                      </div>
                      <div className="mt-9 p-9 flex items-center space-x-1 group w-fit">
                        <button className="outline-none text-sm text-neutral-400 font-bold">
                          Đăng nhập
                        </button>
                        <IconArrowNarrowRight 
                          size='20px' 
                          className="text-neutral-400 transition-transform duration-300 group-hover:translate-x-1" 
                        />
                      </div>
                    </motion.div>
                    <motion.div 
                      className="col-span-2 bg-neutral-950/75 h-fit rounded-2xl"
                      variants={effect.y.item}
                    >
                      <div className="p-9">
                        <h2 className="text-lg text-white font-medium">
                          Cộng đồng
                        </h2>
                      </div>
                      <div className="px-16">
                        <p className="text-neutral-300">
                          Không cần đăng nhập. Khám phá các công thức nấu ăn từ những nhà sáng tạo.
                        </p>
                      </div>
                      <div className="mt-9 p-9 flex items-center space-x-1 group w-fit">
                        <button className="outline-none text-sm text-neutral-400 font-bold">
                          Khám phá cộng đồng
                        </button>
                        <IconArrowNarrowRight 
                          size='20px' 
                          className="text-neutral-400 transition-transform duration-300 group-hover:translate-x-1" 
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                }
              </Tab.Panel>
              <Tab.Panel>
                <motion.div
                  initial={{y: 7, opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{delay: 0.5}}
                  className="p-20 flex items-center justify-center rounded-xl shadow-custombox hover:shadow hover:shadow-neutral-200 transition-shadow duration-300"
                >
                  <div className="space-y-3">
                    <span className="text-sm text-neutral-800 font-bold">
                      Thiết bị sử dụng
                    </span>
                    <div className="grid grid-cols-3 w-screen max-w-xs bg-neutral-200 rounded-md">
                      {devices.map((Device, index) =>
                        <div 
                          key={index} 
                          onClick={() => setDeviceSelected(index)}
                          className="p-1 flex justify-center relative"
                        >
                          <Device 
                            size='20px' 
                            strokeWidth='2'
                            className="text-neutral-500 relative z-10" 
                          />
                          {
                            deviceSelected === index && 
                            <motion.div layoutId="bg-btn" className="absolute inset-0 rounded-md bg-neutral-300/70" />
                          }
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-neutral-800 font-bold">
                      Tin nhắn
                    </span>
                    <div>
                      <textarea 
                        placeholder="Để lại thông tin về vấn đề của bạn tại đây..."
                        className="w-screen max-w-xs p-9"
                      />
                    </div>
                  </div>
                </motion.div>
              </Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>

            <div>
              footer
            </div>
          </div>
        </div>
      </Tab.Group>
    </>
  )
}