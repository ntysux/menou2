'use client'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addMenu, updateMenu } from '@/redux/menu/slice'
import { IconX } from '@tabler/icons-react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { object, string } from 'yup'

const url = process.env.NEXT_PUBLIC_APP_URL

const schema = object({
  name: string().required('Trống !')
})

export default function CUDialog({children, index}: {children: (setState: any) => React.ReactNode, index?: number}) {
  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()
  const menu = useAppSelector(state => state.menu)

  const init = {
    name: '', 
    status: false, 
    currents: Array(3).fill(''), 
    library: Array(3).fill([]), 
    errors: ''
  }

  return (
    <>
      {children(setOpen)}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      
                      {index !== undefined && <div>edit ting</div>}

                        <Formik
                          initialValues={
                            index !== undefined ? {
                              name: menu[index].name,
                              status: menu[index].status,
                              currents: Array(3).fill(''), 
                              library: [
                                menu[index].materials?.split('|') ?? [],
                                menu[index].required?.split('|') ?? [],
                                menu[index].steps?.split('|') ?? [],
                              ],
                              error: ''
                            } : init
                          }
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
                          {({ values, submitForm, setFieldValue }) => (
                            <Form>
                              <Field name='name' type="text" placeholder='Tên món ăn'/>
                              <ErrorMessage name='name' component="div" className='text-xs text-pink-400 font-medium' />

                              {['Nguyên liệu', 'Chuẩn bị', 'Chế biến'].map((field, index) => 
                                <div key={index}>
                                  <Field
                                    name={`currents[${index}]`}
                                    type="text"
                                    placeholder={field}
                                    onKeyDown={(e: any) => {
                                      if(e.key === 'Enter' && values.currents[index].trim()) {
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
                                    }}
                                  />
                                  
                                  <div className='flex gap-3'>
                                    {
                                      values.library[index].map((item: string, key: number) =>
                                        <div key={key} className='flex items-center space-x-1'>
                                          {item}
                                          <IconX
                                            onClick={() => {
                                              setFieldValue('library', 
                                                [
                                                  ...values.library
                                                  .fill([
                                                    ...values.library[index].slice(0, key),
                                                    ...values.library[index].slice(key + 1)
                                                  ], index, index + 1)
                                                ]
                                              )
                                            }}
                                          />
                                        </div>
                                      )
                                    }
                                  </div>
                                </div>
                              )}

                              <div>
                                <button type='button' onClick={() => setFieldValue('status', false)}>Công khai</button>
                                <button type='button' onClick={() => setFieldValue('status', true)}>Riêng tư</button>
                              </div>

                              <button type="button" onClick={submitForm}>
                                {index !== undefined ? 'Cập nhập' : 'Tạo'}
                              </button>
                              <ErrorMessage name='errors' component="div" className='text-xs text-pink-400 font-medium' />
                            </Form>
                          )}
                        </Formik>
                      
                      </div>
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