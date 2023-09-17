'use client'
import { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { add } from '@/redux/menu/slice'
import { IconX } from '@tabler/icons-react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { schema } from '../validate/schema'
import { Init } from '../types/types'
import { handleKeyDownAdd } from '../handle/add'
import { handleRemove } from '../handle/remove'
import { motion } from 'framer-motion'

const url = process.env.NEXT_PUBLIC_APP_URL

export default function CreateForm({setOpen}: {setOpen: Dispatch<SetStateAction<boolean>>}) {
  const dispatch = useAppDispatch()

  const init: Init = {
    name: '', 
    status: false, 
    currents: Array(3).fill(''), 
    library: Array(3).fill([]), 
    error: ''
  }

  async function handleForm(
    values: Init, 
    setSubmitting: (isSubmitting: boolean) => void, 
    setFieldError: (field: string, message: string | undefined) => void
  ) {
    setSubmitting(true)
    const response = await fetch(`${url}/menu/api/create`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({values})
    })
    const result = await response.json()
    if (!result.error) {
      dispatch(add(result))
      setOpen(false)
    } else {
      setFieldError('error', result.error)
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={init}
      validationSchema={schema}
      onSubmit={(values, {setSubmitting, setFieldError}) => handleForm(values, setSubmitting, setFieldError)}
    >
      {({values, submitForm, setFieldValue}) => (
        <Form className='space-y-5'>
          <div className='flex items-center'>
            <Field 
              name='name' 
              type="text" 
              placeholder='Tên món ăn'
              className='w-full outline-none text-xl text-neutral-600 font-bold placeholder:text-neutral-300'
            />
            <div>
              <ErrorMessage 
                name='name'
                component="div" 
                className='min-w-max px-3 py-1 rounded-md bg-rose-100 text-xs text-rose-800 font-bold' 
              />
            </div>
          </div>
          <div className='w-fit grid grid-cols-2'>
            {['Công khai', 'Riêng tư'].map((option, index) =>
              <div className='relative' key={index}>
                <button
                  type='button' 
                  onClick={() => setFieldValue('status', Boolean(index))}
                  className={`
                    relative w-full z-10 p-1 px-3 text-xs font-medium
                    ${
                      values.status === Boolean(index) && values.status 
                      ? 'text-purple-900' 
                      : values.status === Boolean(index) && !values.status
                      ? 'text-sky-900'
                      : 'text-neutral-400'
                    }
                  `}
                >
                  {option}
                </button>
                {
                  values.status === Boolean(index) 
                  && 
                  <motion.div 
                    layoutId='btn' 
                    className={`
                      absolute inset-0 rounded-md
                      ${values.status ? 'bg-purple-100' : 'bg-sky-100'}
                    `}
                  />
                }
              </div>
            )}
          </div>
          
          <div className='space-y-3'>
            {['Nguyên liệu', 'Chuẩn bị', 'Chế biến'].map((field, index) => 
              <div key={index} className='space-y-1'>
                <Field
                  name={`currents[${index}]`}
                  type="text"
                  placeholder={field}
                  className='
                    w-full outline-none py-2 text-sm text-neutral-800 font-medium rounded-sm
                    focus:ring-2 focus:ring-neutral-800 focus:px-2 transition-all
                  '
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDownAdd(e, index, values, setFieldValue)}
                />
                
                <div className={`flex ${index !== 2 ? 'flex-wrap gap-3' : 'flex-col gap-1'}`}>
                  {values.library[index].map((item, key) =>
                    <div 
                      key={key} 
                      className='text-sm text-neutral-800 font-medium inline-flex items-center'
                    >
                      {item}
                      <span>
                        <IconX
                          size='16px' 
                          strokeWidth='2.7' 
                          className='text-neutral-800 cursor-pointer'
                          onClick={() => handleRemove(index, key, values, setFieldValue)}
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='absolute left-0 bottom-0 flex items-center justify-between p-5 w-full bg-white border-t border-neutral-200 rounded-b-2xl'>
            <button 
              type="button"
              onClick={submitForm} 
              className='p-2 px-5 shadow shadow-neutral-200 rounded-lg text-neutral-500 font-medium hover:ring-1 hover:ring-neutral-200'
            >
              Tạo
            </button>
            <ErrorMessage name='error' component="div" className='text-xs text-pink-400 font-medium' />
          </div>
        </Form>
      )}
    </Formik>
  )
}