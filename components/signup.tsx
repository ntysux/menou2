'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { object, string } from 'yup'

const url = process.env.NEXT_PUBLIC_APP_URL
const schema = object({
  username: string()
    .required('Trống')
    .matches(/^[a-zA-Z0-9]+$/, 'Tên đăng nhập không hợp lệ.'),
  password: string()
    .required('Trống')
    .max(24, 'Mật khẩu không quá 24 kí tự')
    .min(8, 'Mật khẩu chứa tối thiểu 8 kí tự'),
  passwordConfirm: string()
    .required('Trống'),
  name: string()
    .required('Trống')
    .max(35, 'Tên người dùng không quá 35 kí tự')
    .matches(/^[a-zA-Z0-9\sđĐà-ỹÀ-Ỹ]+$/, 'Tên người dùng không hợp lệ.')
})

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

export default function Signup() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const isOpen = () => setOpen(true)

  function handleMatchPassword(values: any) {
    const error: {passwordConfirm?: string} = {}
    if(values.password !== values.passwordConfirm) {
      error.passwordConfirm = 'Mật khẩu không khớp.'  
    }

    return error
  }

  return (
    <>
      <button
        onClick={isOpen}
        className="px-5 py-3 rounded-lg text-sm text-neutral-800 shadow-custombox hover:shadow transition-all"
      >
        Tạo tài khoản
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child as={Fragment} {...transition.overlay}>
            <div className="fixed inset-0 bg-neutral-300/75" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-3">
              <Transition.Child as={Fragment} {...transition.panel}>
                <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-9">
                  <Formik
                    initialValues={{name: '', username: '', password: '', passwordConfirm: '' }}
                    validationSchema={schema}
                    validate={values => handleMatchPassword(values)}
                    onSubmit={async(values, {setSubmitting, setFieldError}) => {
                      setSubmitting(true)

                      const response = await fetch(`${url}/auth/api/signup`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({values})
                      })
                      const result = await response.json()
                      if (result.id) {
                        router.replace('/menu')
                      } else {
                        setFieldError('username', result.username)
                      }
                      setSubmitting(false)
                    }}
                  >
                    {({isSubmitting}) => (
                      <Form>
                        <div className='relative'>
                          <Field 
                            type="text" 
                            name="username" 
                            autoComplete="username"
                            placeholder="Tên đăng nhập"
                            className="
                              py-3 w-full outline-none rounded-none border-b-2 border-neutral-800
                              text-sm text-neutral-800 font-medium
                            "
                          />
                          <div className='absolute inset-y-0 right-0 flex items-center'>
                            <ErrorMessageBox name='username' />
                          </div>
                        </div>
                        <div className='relative'>
                          <Field 
                            type="password" 
                            name="password" 
                            autoComplete="current-password"
                            placeholder="Mật khẩu"
                            className="
                              py-3 w-full outline-none rounded-none border-b-2 border-neutral-800
                              text-sm text-neutral-800 font-medium
                            "
                          />
                          <div className='absolute inset-y-0 right-0 flex items-center'>
                            <ErrorMessageBox name='password' />
                          </div>
                        </div>
                        <div className='relative'>
                          <Field 
                            type="password" 
                            name="passwordConfirm" 
                            autoComplete="current-passwordConfirm"
                            placeholder="Nhập lại mật khẩu"
                            className="
                              py-3 w-full outline-none rounded-none border-b-2 border-neutral-800
                              text-sm text-neutral-800 font-medium
                            "
                          />
                          <div className='absolute inset-y-0 right-0 flex items-center'>
                            <ErrorMessageBox name='passwordConfirm' />
                          </div>
                        </div>
                        <div className='relative'>
                          <Field 
                            type="text" 
                            name="name" 
                            autoComplete="name"
                            placeholder="Tên người dùng"
                            className="
                              py-3 w-full outline-none rounded-none border-b-2 border-neutral-800
                              text-sm text-neutral-800 font-medium
                            "
                          />
                          <div className='absolute inset-y-0 right-0 flex items-center'>
                            <ErrorMessageBox name='name' />
                          </div>
                        </div>
                        <div className='mt-9 text-center'>
                          <button 
                            type='submit' 
                            className='outline-none text-sm text-neutral-800 font-bold disabled:opacity-40'
                            disabled={isSubmitting}
                          >
                            {
                              isSubmitting 
                              ?
                              <div className="h-5 w-5 animate-spin rounded-full border-4 border-white border-r-neutral-800" />
                              :
                              <>Đăng kí</>
                            }
                          </button>
                        </div>
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

function ErrorMessageBox({name}: {name: string}) {
  return <ErrorMessage 
    name={name}
    component="div" 
    className='px-3 py-1 rounded-md bg-pink-100 text-xs text-neutral-700 font-bold' 
  />
}