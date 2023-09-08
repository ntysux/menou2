'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { object, string } from 'yup'

const url = process.env.NEXT_PUBLIC_APP_URL
const schema = object({
  username: string().required('Trống'),
  password: string().required('Trống')
})

export default function Signin({
  children
} : {
  children?: (setState: Dispatch<SetStateAction<boolean>>) => React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(children ? false : true)
  const onClose = () => children && setOpen(false)

  return (
    <>
      {children && children(setOpen)}

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-950/20" />
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
                <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-7">
                  <Formik
                    initialValues={{username: '', password: '', error: ''}}
                    validationSchema={schema}
                    onSubmit={async(values, {setSubmitting, setFieldError}) => {
                      setSubmitting(true)
                      const response = await fetch(`${url}/auth/api/signin`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({values})
                      })
                      const result = await response.json()
                      
                      if(result.id) {
                        if (children) {
                          router.replace('/menu')
                        } else {
                          router.refresh()
                        }
                        return
                      } else {
                        setFieldError('error', result.error)
                      }
                      setSubmitting(false)
                    }}
                  >
                    <Form className='space-y-3'>
                      <div className='relative'>
                        <Field 
                          type="text" 
                          name="username" 
                          placeholder="Tên đăng nhập"
                          autoComplete="username"
                          className="
                            p-3 w-full outline-none rounded-sm ring-1 ring-neutral-300
                            text-sm text-neutral-800 font-medium focus:ring-2 focus:ring-neutral-800
                          "
                        />
                        <div className='absolute inset-y-0 right-1 flex items-center'>
                          <ErrorMessageBox name='username' />
                        </div>
                      </div>
                      <div className='relative'>
                        <Field 
                          type="password" 
                          name="password" 
                          placeholder="Mật khẩu"
                          autoComplete="current-password"
                          className="
                            p-3 w-full outline-none rounded-sm ring-1 ring-neutral-300
                            text-sm text-neutral-800 font-medium focus:ring-2 focus:ring-neutral-800
                          "
                        />
                        <div className='absolute inset-y-0 right-1 flex items-center'>
                          <ErrorMessageBox name='password' />
                        </div>
                      </div>
                      <div className='flex justify-end'>
                        <button type='submit' className='outline-none mt-9 text-sm text-neutral-800 font-bold'>
                          Đăng nhập
                        </button>
                      </div>
                      <ErrorMessageBox name='error' />
                    </Form>
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