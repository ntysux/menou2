'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { schema } from './schema'
import { url } from '@/utils/app.url'

interface Init {
  username: string
  password: string
  error: string
}

export default function Signin() {
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
      {({values, isSubmitting}) => (
        <Form className='space-y-3'>
          <ErrorMessage 
            name='error' 
            component='div' 
            className='w-fit p-1 px-3 rounded-md text-rose-800 bg-rose-100 text-xs font-bold' 
          />
          <div className='relative'>
            <label htmlFor='username' className={`
              absolute transition-all cursor-text
              ${focus[0] ? 'left-3 top-3 text-xs text-neutral-800 font-bold' : 'left-3 top-5 text-sm text-neutral-400 font-medium'} 
            `}>
              Tên đăng nhập
            </label>
            <Field
              type="text" 
              id="username"
              name="username" 
              autoComplete="username"
              className="
                p-3 pt-7 w-full outline-none rounded-md text-sm text-neutral-800 font-medium
                focus:ring-2 focus:ring-neutral-800 ring-inset
              "
              onFocus={() => setFocus([true, focus[1]])}
              onBlur={() => !values.username.length && setFocus([false, focus[1]])}
            />
          </div>
          <ErrorMessage 
            name='username' 
            component='div' 
            className='w-fit p-1 px-3 rounded-md text-rose-800 bg-rose-100 text-xs font-bold' 
          />
          <div className='relative'>
            <label 
              htmlFor='password'
              className={`
                absolute transition-all cursor-text
                ${focus[1] ? 'left-3 top-3 text-xs text-neutral-800 font-bold' : 'left-3 top-5 text-sm text-neutral-400 font-medium'} 
              `}
            >
              Mật khẩu
            </label>
            <Field 
              type="password" 
              id='password'
              name="password" 
              autoComplete="current-password"
              className="
                p-3 pt-7 w-full outline-none rounded-md text-sm text-neutral-800 font-medium
                focus:ring-2 focus:ring-neutral-800 ring-inset
              "
              onFocus={() => setFocus([focus[0], true])}
              onBlur={() => !values.password.length && setFocus([focus[0], false])}
            />
          </div>
          <ErrorMessage 
            name='password' 
            component='div' 
            className='w-fit p-1 px-3 rounded-md text-rose-800 bg-rose-100 text-xs font-bold' 
          />
          <div className='text-right'>
            <button 
              type='submit' 
              className='outline-none text-center text-sm text-neutral-950/75 font-bold'
              disabled={isSubmitting}
            >
              {
                isSubmitting
                ?
                <div className="h-4 w-4 animate-spin rounded-full border-4 border-neutral-950/20 border-r-neutral-50/0" />
                :
                <>Đăng nhập</>
              }
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}