'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { Dispatch, SetStateAction, useState } from 'react'
import { schema } from './schema'

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
}

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
  {name: 'name', label: 'Tên người dùng', type: 'text'}
]

export default function Signup({setOpen}: Props) {
  const 
    router = useRouter(),
    [focus, setFocus] = useState<boolean[]>(Array(4).fill(false))

  const handleForm = async (
    {username, password, name}: Init,
    {setFieldError}: FormikHelpers<Init>
  ) => {
    const response = await signIn('signup', {
      redirect: false,
      username,
      password,
      name
    })

    if (response?.ok) {
      router.replace('/menu')
      return
    } else {
      setFieldError('username', response?.error!)
    }
  }

  const handleFieldTouching = (index: number, values?: Init) => {
    if (!values) {
      setFocus([...focus.fill(true, index, index + 1)])
    } else {
      // @ts-expect-error
      !values[fields[index].name] && setFocus([...focus.fill(false, index, index + 1)])
    }
  }

  return (
    <Formik
      initialValues={{name: '', username: '', password: '', passwordConfirm: '' } as Init}
      validationSchema={schema}
      onSubmit={(values, formikHelpers) => handleForm(values, formikHelpers)}
    >
      {({values, isSubmitting, errors, touched}) => (
        <div className='relative'>
          <div 
            className={`
              ${Object.values(errors).some(Boolean) && Object.values(touched).some(Boolean) ? 'flex' : 'hidden'} 
              absolute z-10 top-3 right-3 py-1 px-3 rounded-md text-xs text-white font-medium bg-neutral-950/25
            `}
          >
            {Object.values(errors).find(Boolean)}
          </div>
          <Form className='divide-y divide-neutral-600'>
            <div className='p-3'>
              {fields.map((field, index) =>
                <div key={index} className='relative'>
                  <label 
                    htmlFor={field.name} 
                    className={`
                      ${focus[index] ? 'top-3 text-xs text-white font-bold' : 'top-5 text-sm text-neutral-300 font-medium'} 
                      left-3 absolute transition-all cursor-text
                    `}
                  >
                    {field.label}
                  </label>
                  <Field
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    autoComplete='off'
                    onFocus={() => handleFieldTouching(index)}
                    onBlur={() => handleFieldTouching(index, values)}
                    className="p-3 pt-7 w-full outline-none text-sm text-white font-medium bg-neutral-950/0"
                  />
                </div>
              )}
            </div>
            <div className='grid grid-cols-2 divide-x divide-neutral-600'>
              <button 
                type='button'
                onClick={() => setOpen(false)}
                className='outline-none p-3 text-center text-sm text-neutral-300 font-medium hover:bg-neutral-600 hover:text-white'
              >
                Đóng
              </button>
              <button 
                type='submit' 
                disabled={isSubmitting}
                className='outline-none w-full p-3 flex items-center justify-center text-sm text-neutral-300 font-medium hover:bg-neutral-600 hover:text-white'
              >
                {
                  isSubmitting 
                  ? <Spin />
                  : 'Tạo tài khoản'
                }
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

function Spin() {
  return <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-r-neutral-50/0" />
}