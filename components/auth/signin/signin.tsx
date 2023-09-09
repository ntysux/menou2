'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { usePathname, useRouter } from 'next/navigation'
import { object, string } from 'yup'

const url = process.env.NEXT_PUBLIC_APP_URL
const schema = object({
  username: string().required('Trống'),
  password: string().required('Trống')
})

export default function Signin() {
  const pathname = usePathname()
  const router = useRouter()

  return (
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
          if (pathname === '/') {
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
      {({isSubmitting}) => (
        <Form>
          <ErrorMessageBox name='error' />
          <div className='relative'>
            <Field 
              type="text" 
              name="username" 
              placeholder="Tên đăng nhập"
              autoComplete="username"
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
              placeholder="Mật khẩu"
              autoComplete="current-password"
              className="
                py-3 w-full outline-none rounded-none border-b-2 border-neutral-800
                text-sm text-neutral-800 font-medium
              "
            />
            <div className='absolute inset-y-0 right-0 flex items-center'>
              <ErrorMessageBox name='password' />
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
                <>Đăng nhập</>
              }
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

function ErrorMessageBox({name}: {name: string}) {
  return <ErrorMessage 
    name={name}
    component="div" 
    className='px-3 py-1 rounded-md bg-pink-100 text-xs text-neutral-700 font-bold' 
  />
}