'use client'
import { Formik, Form, Field } from 'formik'
import { usePathname, useRouter } from 'next/navigation'
import { useState, Dispatch, SetStateAction } from 'react'
import { schema } from './schema'
import { url } from '@/utils/app.url'

interface Init {
  username: string
  password: string
  error: string
}

export default function Signin({setOpen}: {setOpen?: Dispatch<SetStateAction<boolean>>}) {
  const pathname = usePathname(),
    router = useRouter(),
    [focus, setFocus] = useState<boolean[]>([false, false])

  async function handleForm(
    values: Init, 
    setSubmitting: (isSubmitting: boolean) => void, 
    setFieldError: (field: string, message: string | undefined) => void
  ) {
    setSubmitting(true)

    const response = await fetch(`${url}/auth/api/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({values})
    })
    const result = await response.json()
    if(result.id) {
      if (pathname === '/') router.replace('/menu') 
      else router.refresh()
      return
    } else {
      setFieldError('error', result.error)
      setSubmitting(false)
    }
  }
  
  return (
    <Formik
      initialValues={{username: '', password: '', error: ''}}
      validationSchema={schema}
      onSubmit={(values, {setSubmitting, setFieldError}) => handleForm(values, setSubmitting, setFieldError)}
    >
      {({values, isSubmitting, errors}) => (
        <Form className='relative divide-y divide-neutral-600'>
          <div className={`
            ${errors.password || errors.username || errors.error ? 'opacity-1' : 'opacity-0'} 
            absolute z-10 top-3 right-3 py-1 px-3 rounded-md text-xs text-white font-medium bg-neutral-950/25
          `}
          >
            {errors.password || errors.username || errors.error}
          </div>
          <div className='p-3'>
            <div className='relative'>
              <label htmlFor='username' className={`
                absolute transition-all cursor-text
                ${focus[0] ? 'left-3 top-3 text-xs text-white font-bold' : 'left-3 top-5 text-sm text-neutral-300 font-medium'} 
              `}>
                Tên đăng nhập
              </label>
              <Field
                type="text" 
                id="username"
                name="username" 
                autoComplete="username"
                className="p-3 pt-7 w-full outline-none text-sm text-white font-medium bg-neutral-950/0"
                onFocus={() => setFocus([true, focus[1]])}
                onBlur={() => !values.username.length && setFocus([false, focus[1]])}
              />
            </div>
            <div className='relative'>
              <label 
                htmlFor='password'
                className={`
                  absolute transition-all cursor-text
                  ${focus[1] ? 'left-3 top-3 text-xs text-white font-bold' : 'left-3 top-5 text-sm text-neutral-300 font-medium'} 
                `}
              >
                Mật khẩu
              </label>
              <Field 
                type="password" 
                id='password'
                name="password" 
                autoComplete="current-password"
                className="p-3 pt-7 w-full outline-none rounded-md text-sm text-white font-medium bg-neutral-950/0"
                onFocus={() => setFocus([focus[0], true])}
                onBlur={() => !values.password.length && setFocus([focus[0], false])}
              />
            </div>
          </div>
          <div className={`${setOpen && 'grid grid-cols-2 divide-x divide-neutral-600'}`}>
            {
              setOpen &&
              <button 
                type='button'
                onClick={() => setOpen(false)}
                className='outline-none p-3 text-center text-sm text-neutral-300 font-medium hover:bg-neutral-700 hover:text-white'
              >
                Đóng
              </button>
            }
            <button
              type='submit' 
              disabled={isSubmitting}
              className='outline-none w-full p-3 flex items-center justify-center text-sm text-neutral-300 font-medium hover:bg-neutral-700 hover:text-white'
            >
              {
                isSubmitting
                ?
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-r-neutral-50/0" />
                :
                'Đăng nhập'
              }
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}