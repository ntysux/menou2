'use client'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/navigation'
import { schema } from './schema'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { url } from '@/utils/app.url'

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

export default function Signup({setOpen}: {setOpen: Dispatch<SetStateAction<boolean>>}) {
  const 
    router = useRouter(),
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

  function ErrorsMessage({errors}: any) {
    return (
      <div className={`
        ${fields.some(field => errors[`${field.name}`]) ? 'opacity-1' : 'opacity-0'} 
        absolute z-10 top-3 right-3 py-1 px-3 rounded-md text-xs text-white font-medium bg-neutral-950/25
      `}
      >
        {errors.name || errors.password || errors.passwordConfirm || errors.username}
      </div>
    )
  }

  return (
    <Formik
      initialValues={{name: '', username: '', password: '', passwordConfirm: '' }}
      validationSchema={schema}
      onSubmit={(values, {setSubmitting, setFieldError}) => handleForm(values, setSubmitting, setFieldError)}
    >
      {({values, isSubmitting, errors}) => (
        <Form className='relative divide-y divide-neutral-600'>
          <ErrorsMessage errors={errors} />
          <div className='p-3'>
            {fields.map((field, index) =>
              <Fragment key={index}>
                <div className='relative'>
                  <label htmlFor={field.name} className={`
                    absolute transition-all cursor-text
                    ${focus[index] ? 'left-3 top-3 text-xs text-white font-bold' : 'left-3 top-5 text-sm text-neutral-300 font-medium'} 
                  `}>
                    {field.label}
                  </label>
                  <Field
                    type={field.type}
                    id={field.name}
                    name={field.name} 
                    autoComplete={field.name}
                    className="p-3 pt-7 w-full outline-none text-sm text-white font-medium bg-neutral-950/0"
                    onFocus={() => setFocus([...focus.fill(true, index, index + 1)])}
                    onBlur={() => !values.username.length && setFocus([...focus.fill(false, index, index + 1)])}
                  />
                </div>
              </Fragment>
            )}
          </div>
          <div className='grid grid-cols-2 divide-x divide-neutral-600'>
            <button 
              type='button'
              onClick={() => setOpen(false)}
              className='outline-none p-3 text-center text-sm text-neutral-300 font-medium hover:bg-neutral-700 hover:text-white'
            >
              Đóng
            </button>
            <button 
              disabled={isSubmitting}
              type='submit' 
              className='outline-none w-full p-3 flex items-center justify-center text-sm text-neutral-300 font-medium hover:bg-neutral-700 hover:text-white'
            >
              {
                isSubmitting 
                ?
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-r-neutral-50/0" />
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