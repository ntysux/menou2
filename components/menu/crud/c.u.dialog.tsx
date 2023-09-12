'use client'
import { Dispatch, Fragment, KeyboardEvent, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addMenu, updateMenu } from '@/redux/menu/slice'
import { IconX } from '@tabler/icons-react'
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik'
import { object, string } from 'yup'

const url = process.env.NEXT_PUBLIC_APP_URL
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

const schema = object({
  name: string().required('Trống !')
})

interface Init {
  name: string
  status: boolean
  currents: string[]
  library: string[][]
  error: string
}

export default function CUDialog({
  children,
  index
}: {
  children: (setState: Dispatch<SetStateAction<boolean>>) => React.ReactNode
  index?: number
}) {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)

  const init: Init = index !== undefined ? {
    name: menu[index].name,
    status: menu[index].status,
    currents: Array(3).fill(''), 
    library: [
      menu[index].materials?.split('|') ?? [],
      menu[index].required?.split('|') ?? [],
      menu[index].steps?.split('|') ?? [],
    ],
    error: ''
  } : {
    name: '', 
    status: false, 
    currents: Array(3).fill(''), 
    library: Array(3).fill([]), 
    error: ''
  }

  function handleAddWithEnter(
    event: KeyboardEvent<HTMLInputElement>, 
    index: number,
    values: Init, 
    setFieldValue: (field: string, value: any) => Promise<void | FormikErrors<Init>>
  ) {
    if(event.key === 'Enter' && values.currents[index].trim()) {
      setFieldValue('library', 
        [
          ...values.library
          .fill(
            [
              ...values.library[index], 
              values.currents[index].trim().replace(/ {2,}/g, ' ')
            ], 
            index, 
            index + 1
          )
        ]
      )

      setFieldValue('currents', [...values.currents.fill('', index, index + 1)])
    }
  }
  
  function handleRemoveItem(
    index: number,
    key: number,
    values: Init, 
    setFieldValue: (field: string, value: any) => Promise<void | FormikErrors<Init>>
  ) {
    setFieldValue('library', 
      [
        ...values.library
        .fill([
          ...values.library[index].slice(0, key),
          ...values.library[index].slice(key + 1)
        ], index, index + 1)
      ]
    )
  }

  return (
    <>
      {children(setOpen)}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child as={Fragment} {...transition.overlay}>
            <div className="fixed inset-0 bg-neutral-950/25 transition-opacity backdrop-blur-[1px]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-3 right-3 flex max-w-full">
                <Transition.Child as={Fragment} {...transition.translate}>
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-2xl">
                    <div className="flex flex-col p-7 pb-20 h-full overflow-y-scroll hidden-scroll bg-white rounded-2xl">
                      <Formik
                        initialValues={init}
                        validationSchema={schema}
                        onSubmit={async (values, {setSubmitting, setFieldError}) => {
                          setSubmitting(true)

                          if (index !== undefined) {
                            const res = await fetch(`${url}/menu/api/update`, {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify({
                                id: menu[index].id, 
                                name: values.name,
                                library: values.library,
                                status: values.status
                              })
                            })

                            const rs = await res.json()

                            if (rs.id) {
                              dispatch(updateMenu({page: {
                                ...menu[index],
                                name: values.name,
                                materials: values.library[0].length ? values.library[0].join('|') : undefined,
                                required: values.library[1].length ? values.library[1].join('|') : undefined,
                                steps: values.library[2].length ? values.library[2].join('|') : undefined,
                                status: values.status
                              }, index}))
                              setOpen(false)
                              return
                            }
                          } else {
                            const res = await fetch(`${url}/menu/api/create`, {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify({values})
                            })

                            const rs = await res.json()

                            if (!rs.error) {
                              dispatch(addMenu(rs))
                              setOpen(false)
                              return
                            } else {
                              setFieldError('errors', rs.error)
                              setSubmitting(false)
                            }
                          }
                        }}
                      >
                        {({values, submitForm, setFieldValue}) => (
                          <Form>
                            <div className='relative'>
                              <Field 
                                name='name' 
                                type="text" 
                                placeholder='Tên món ăn'
                                className='w-full outline-none text-3xl text-neutral-800 font-light placeholder:text-neutral-300'
                              />
                              <div className='absolute inset-y-0 right-0 flex items-center'>
                                <ErrorMessage 
                                  name='name'
                                  component="div" 
                                  className='px-3 py-1 rounded-md bg-pink-100 text-xs text-neutral-700 font-bold' 
                                />
                              </div>
                            </div>
                            
                            <div className='space-y-3 my-9'>
                              {['Nguyên liệu', 'Chuẩn bị', 'Chế biến'].map((field, index) => 
                                <div key={index}>
                                  <Field
                                    name={`currents[${index}]`}
                                    type="text"
                                    placeholder={field}
                                    className='w-full outline-none py-3 border-b-2 border-neutral-800 rounded-none text-sm text-neutral-800 font-medium'
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleAddWithEnter(e, index, values, setFieldValue)}
                                  />
                                  
                                  <div className={`flex ${index !== 2 ? 'flex-wrap gap-3' : 'flex-col gap-1'}`}>
                                    {values.library[index].map((item: string, key: number) =>
                                      <div 
                                        key={key} 
                                        className='text-sm text-neutral-800 font-medium inline-flex items-center'
                                      >
                                        {item}
                                        <span>
                                          <IconX
                                            size='16px' 
                                            strokeWidth='2.7' 
                                            className='text-neutral-800 cursor-pointer'
                                            onClick={() => handleRemoveItem(index, key, values, setFieldValue)}
                                          />
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className='absolute left-0 bottom-0 flex items-center justify-between p-7 w-full bg-white border-t border-neutral-200 rounded-b-2xl'>
                              <div>
                                <button 
                                  type="button" 
                                  onClick={submitForm}
                                  className='p-1 px-5 bg-neutral-800 rounded-lg text-sm text-white font-medium'
                                >
                                  {index !== undefined ? 'Cập nhập' : 'Tạo'}
                                </button>
                                <ErrorMessage name='error' component="div" className='text-xs text-pink-400 font-medium' />
                              </div>
                              <div className='space-x-3'>
                                <button 
                                  type='button' 
                                  onClick={() => setFieldValue('status', false)}
                                  className={`
                                    p-1 px-3 text-sm text-neutral-800 font-medium rounded-md 
                                    ${!values.status && 'bg-neutral-200'}
                                  `}
                                >
                                  Công khai
                                </button>
                                <button 
                                  type='button' 
                                  onClick={() => setFieldValue('status', true)}
                                  className={`
                                    p-1 px-3 text-sm text-neutral-800 font-medium rounded-md 
                                    ${values.status && 'bg-neutral-200'}
                                  `}
                                >
                                  Riêng tư
                                </button>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
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