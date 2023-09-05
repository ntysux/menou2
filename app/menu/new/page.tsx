'use client'

import { IconX } from '@tabler/icons-react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { object, string } from 'yup'

const url = process.env.NEXT_PUBLIC_APP_URL

const schema = object({
  name: string().required('Trống !')
})

export default function NewPageMenu() {
  const router = useRouter()

  return (
    <>
      <Formik
        initialValues={{name: '', status: false, currents: Array(3).fill(''), library: Array(3).fill([]), errors: ''}}
        validationSchema={schema}
        onSubmit={async (values, {setSubmitting, setFieldError}) => {
          setSubmitting(true)

          const res = await fetch(`${url}/menu/new/api`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({values})
          })

          const rs = await res.json()
          
          if (rs.id) {
            router.push('/menu')
            return
          } else {
            setFieldError('errors', rs.error)
          }
          
          setSubmitting(false)
        }}
      >
        {({ values, submitForm, setFieldValue }) => (
          <Form>
            <Field name='name' type="text" placeholder='Tên món ăn'/>
            <ErrorMessage name='name' component="div" className='text-xs text-pink-400 font-medium' />

            {['Nguyên liệu', 'Chuẩn bị', 'Chế biến'].map((field, index) => 
              <div key={index}>
                <Field
                  name={`currents[${index}]`}
                  type="text"
                  placeholder={field}
                  onKeyDown={(e: any) => {
                    if(e.key === 'Enter' && values.currents[index].trim()) {
                      setFieldValue('library', 
                        [
                          ...values.library
                          .fill(
                            [
                              ...values.library[index], 
                              values.currents[index].trim().replace(/ {2,}/g, ' ')
                            ], 
                            index, 
                            index + 1
                          )
                        ]
                      )

                      setFieldValue('currents', [...values.currents.fill('', index, index + 1)])
                    }
                  }}
                />
                
                <div className='flex gap-3'>
                  {
                    values.library[index].map((item: string, key: number) =>
                      <div key={key} className='flex items-center space-x-1'>
                        {item}
                        <IconX
                          onClick={() => {
                            setFieldValue('library', 
                              [
                                ...values.library
                                .fill([
                                  ...values.library[index].slice(0, key),
                                  ...values.library[index].slice(key + 1)
                                ], index, index + 1)
                              ]
                            )
                          }}
                        />
                      </div>
                    )
                  }
                </div>
              </div>
            )}

            <div>
              <button type='button' onClick={() => setFieldValue('status', false)}>Công khai</button>
              <button type='button' onClick={() => setFieldValue('status', true)}>Riêng tư</button>
            </div>

            <button type="button" onClick={submitForm}>
              Tạo
            </button>
            <ErrorMessage name='errors' component="div" className='text-xs text-pink-400 font-medium' />
          </Form>
        )}
      </Formik>
    </>
  )
}