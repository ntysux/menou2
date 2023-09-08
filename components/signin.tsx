'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { object, string } from 'yup'

const url = process.env.NEXT_PUBLIC_APP_URL

export default function Signin({children} : {children?: (setState: any) => React.ReactNode}) {
  const [isOpen, setOpen] = useState(children ? false : true)
  const router = useRouter()

  function closeModal() {
    if (children) {
      setOpen(false)
    }
  }

  const schema = object({
    username: string().required('Trống'),
    password: string().required('Trống')
  })

  return (
    <>
      {children && children(setOpen)}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={schema}
                    onSubmit={async(values, { setSubmitting, setFieldError }) => {
                      setSubmitting(true)
                      const res = await fetch(`${url}/auth/api/signin`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({values})
                      })

                      const rs = await res.json()
                      
                      if(rs.id) {
                        if (children) {
                          router.replace('/menu')
                        } else {
                          router.refresh()
                        }
                      } else {
                        setFieldError('username', rs.error)
                        return
                      }
                      
                      setSubmitting(false)
                    }}
                  >
                    {({values}) => (
                      <Form>
                        <div className='flex space-x-3'>
                          <Field 
                            type="text" 
                            name="username" 
                            placeholder="Tên đăng nhập"
                            autoComplete="username"
                          />
                          <ErrorMessage name='username' component="div" className='text-xs text-pink-400 font-medium' />
                        </div>
                        <div className='flex space-x-3'>
                          <Field 
                            type="password" 
                            name="password" 
                            placeholder="Mật khẩu"
                            autoComplete="current-password"
                          />
                          <ErrorMessage name='password' component="div" className='text-xs text-pink-400 font-medium' />
                        </div>
                        <button type='submit'>
                          Đăng nhập
                        </button>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}