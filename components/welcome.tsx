'use client'
import { Dialog, Tab, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"

interface Step {
  title: string
  content: string
}

const steps: Step[] = [
  {
    title: 'Chào mừng đến với Menoú', 
    content: 'Menoú là một ứng dụng tạo công thức nấu ăn (Menu) và lên thực đơn (Nhóm).'
  },
  {
    title: 'Menu', 
    content: 'Tạo các công thức nấu ăn của riêng bạn. Các công thức sẽ được hiển thị bên Cộng đồng nếu bạn để công khai (Mặc định).'
  },
  {
    title: 'Nhóm', 
    content: 'Mọi công thức bạn đã tạo hay những món ăn được thêm vào sẽ được tập hợp để tạo thành một thực đơn.'
  },
  {
    title: "Let's go", 
    content: 'Ok, giờ hãy tạo công thức nấu ăn đầu tiên của bạn thôi nào.'
  },
]

export default function Welcome() {
  const [open, setOpen] = useState(false)
  const [keyIndex, setKeyIndex] = useState(0)

  useEffect(() => {
    const welcome = localStorage.getItem('welcome')
    if (!welcome) {
      setOpen(true)
      localStorage.setItem('welcome', 'true')
    }
  }, [])

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => false}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-950/25" />
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
                <Dialog.Panel className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-9 shadow-xl shadow-neutral-300">
                  <BgGradient />
                  <Tab.Group>
                    <Tab.Panels>
                      {steps.map((step, index) => 
                        <Tab.Panel 
                          key={index} 
                          className='outline-none'
                        >
                          <div className="p-3">
                            <h2 className="text-neutral-800 font-bold">
                              {step.title}
                            </h2>
                          </div>
                          <div className="p-5">
                            <p className="text-sm text-neutral-800 font-medium">
                              {step.content}
                            </p>
                          </div>
                        </Tab.Panel>
                      )}
                    </Tab.Panels>
                    <Tab.List>
                      <Tab className='hidden' />
                      <div className="p-3 flex items-center justify-center">
                        {Array(3).fill('Tiếp').map((btnText, index) =>
                          <Tab 
                            key={index}
                            onClick={() => setKeyIndex(keyIndex + 1)}
                            className={`${keyIndex === index ? 'flex' : 'hidden'} text-sm text-neutral-800 font-bold`}
                          >
                            {btnText}
                          </Tab>
                        )}
                        <button 
                          onClick={() => setOpen(false)}
                          className={`${keyIndex === 3 ? 'flex' : 'hidden'} text-sm text-neutral-800 font-bold`}
                        >
                          {`Let's go`}
                        </button>
                      </div>
                    </Tab.List>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function BgGradient() {
  return (
    <>
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
    </>
  )
}