'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import { schema } from './schema'
import { Fragment, useState } from 'react'

const url = process.env.NEXT_PUBLIC_APP_URL

interface Init {
  username: string
  password: string
  passwordConfirm: string
  name: string
}

interface Field {
  name: string
  label: string
  type: string
}

const fields: Field[] = [
  {name: 'username', label: 'Tên đăng nhập', type: 'text'},
  {name: 'password', label: 'Mật khẩu', type: 'password'},
  {name: 'passwordConfirm', label: 'Nhập lại mật khẩu', type: 'password'},
  {name: 'name', label: 'Tên người dùng', type: 'text'},
]

export default function Signup() {
  const router = useRouter(),
    [focus, setFocus] = useState<boolean[]>(Array(4).fill(false))

  async function handleForm(
    values: Init,
    setSubmitting: (isSubmitting: boolean) => void,
    setFieldError: (field: string, message: string | undefined) => void
  ) {
    setSubmitting(true)
    const response = await fetch(`${url}/auth/api/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({values})
    })
    const result = await response.json()
    if (result.id) {
      router.replace('/menu')
      return
    } else {
      setFieldError('username', result.username)
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{name: '', username: '', password: '', passwordConfirm: '' }}
      validationSchema={schema}
      onSubmit={(values, {setSubmitting, setFieldError}) => handleForm(values, setSubmitting, setFieldError)}
    >
      {({values, isSubmitting}) => (
        <Form className='space-y-3'>
          {fields.map((field, index) =>
            <Fragment key={index}>
              <div className='relative'>
                <label htmlFor={field.name} className={`
                  absolute transition-all cursor-text
                  ${focus[index] ? 'left-3 top-3 text-xs text-neutral-800 font-bold' : 'left-3 top-5 text-sm text-neutral-400 font-medium'} 
                `}>
                  {field.label}
                </label>
                <Field
                  type={field.type}
                  id={field.name}
                  name={field.name} 
                  autoComplete={field.name}
                  className="
                    p-3 pt-7 w-full outline-none rounded-sm text-sm text-neutral-800 font-medium
                    focus:ring-2 focus:ring-neutral-800
                  "
                  onFocus={() => setFocus([...focus.fill(true, index, index + 1)])}
                  onBlur={() => !values.username.length && setFocus([...focus.fill(false, index, index + 1)])}
                />
              </div>
              <ErrorMessage 
                name={field.name}
                component='div' 
                className='w-fit p-1 px-3 rounded-md text-rose-800 bg-rose-100 text-xs font-bold' 
              />
            </Fragment>
          )}
          <div className='text-right'>
            <button 
              type='submit' 
              className='outline-none text-sm text-neutral-800 font-bold disabled:opacity-40'
              disabled={isSubmitting}
            >
              {
                isSubmitting 
                ?
                <div className="h-4 w-4 animate-spin rounded-full border-4 border-white border-r-neutral-800" />
                :
                <>Tạo tài khoản</>
              }
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}