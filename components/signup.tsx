'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Fragment, useState } from 'react'
import { object, string } from 'yup'

export default function Signup() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const schema = object({
    username: string()
      .required('Thông tin trống')
      .matches(/^[a-zA-Z0-9]+$/, 'Tên đăng nhập không hợp lệ.'),
    password: string()
      .required('Thông tin trống')
      .max(24, 'Mật khẩu không quá 24 kí tự')
      .min(8, 'Mật khẩu chứa tối thiểu 8 kí tự'),
    passwordConfirm: string()
      .required('Thông tin trống'),
    name: string()
      .required('Thông tin trống')
      .max(35, 'Tên người dùng không quá 35 kí tự')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Tên người dùng không hợp lệ.')
  })

  function handleMatchPassword(values: any) {
    const errors: {passwordConfirm?: string} = {}
    if(values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Mật khẩu không khớp.'  
    }

    return errors
  }

  return (
    <>
      <button onClick={openModal}>
        Tạo tài khoản
      </button>

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
                    initialValues={{name: '', username: '', password: '', passwordConfirm: '' }}
                    validationSchema={schema}
                    validate={values => handleMatchPassword(values)}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(values)
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
                          />
                          <ErrorMessage name='username' component="div" className='text-xs text-pink-400 font-medium' />
                        </div>
                        <div className='flex space-x-3'>
                          <Field 
                            type="password" 
                            name="password" 
                            placeholder="Mật khẩu"
                          />
                          <ErrorMessage name='password' component="div" className='text-xs text-pink-400 font-medium' />
                        </div>
                        <div className='flex space-x-3'>
                          <Field 
                            type="password" 
                            name="passwordConfirm" 
                            placeholder="Mật khẩu"
                          />
                          <ErrorMessage name='passwordConfirm' component="div" className='text-xs text-pink-400 font-medium' />
                        </div>
                        <div className='flex space-x-3'>
                          <Field 
                            type="text" 
                            name="name" 
                            placeholder="Tên người dùng"
                          />
                          <ErrorMessage name='name' component="div" className='text-xs text-pink-400 font-medium' />
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