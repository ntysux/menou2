'use client'
import { useRef } from 'react'
import { ErrorMessage, Field as FormikField, Form, Formik, FormikHelpers } from 'formik'
import Field from '../field'
import Items from '../items'
import Status from '../status'
import { add } from '@/redux/menu/slice'
import { Menu } from '@/redux/menu/types'
import { schema } from '../validate/schema'
import { useAppDispatch } from '@/redux/hooks'
import { Init, OpenDialog } from '../types/types'

const url = process.env.NEXT_PUBLIC_APP_URL

async function handleApi(values: Init): Promise<Menu | string> {
  const response = await fetch(`${url}/menu/api/create`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({values})
  })
  const result = await response.json()
  return result.page ?? result.error
}

export default function CreateForm({setOpen}: {setOpen: OpenDialog}) {
  const dispatch = useAppDispatch()
  const materialsRef = useRef<HTMLInputElement | null>(null),
    requiredRef = useRef<HTMLInputElement | null>(null),
    stepsRef = useRef<HTMLInputElement | null>(null)

  const fields = [
    {name: 'Nguyên liệu', ref: materialsRef},
    {name: 'Chuẩn bị', ref: requiredRef}, 
    {name: 'Chế biến', ref: stepsRef}
  ]

  const init: Init = {
    name: '', 
    status: false, 
    currents: Array(3).fill(''), 
    library: Array(3).fill([]), 
    error: ''
  }

  async function handleSubmit(values: Init, {setSubmitting, setFieldError}: FormikHelpers<Init>) {
    setSubmitting(true)
    const result = await handleApi(values)
    if (typeof result !== 'string') {
      dispatch(add(result))
      setOpen(false)
    } else {
      setFieldError('error', result)
      setSubmitting(false) 
    }
  }

  return (
    <Formik
      initialValues={init}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({values, submitForm, setFieldValue, isSubmitting, errors}) => (
        <Form className='space-y-5'>
          <FormikField 
            name='name' 
            type="text" 
            placeholder='Tên món ăn'
            className='w-full outline-none text-xl text-neutral-600 font-bold placeholder:text-neutral-300'
            onBlur={() => setFieldValue('name', values.name.trim().replace(/ {2,}/g, ' '))}
          />
          <Status 
            values={values} 
            setFieldValue={setFieldValue} 
          />
          <div className='space-y-3'>
            {fields.map((field, index) => 
              <div key={index} className='space-y-1'>
                <Field 
                  field={field} 
                  index={index} 
                  values={values} 
                  setFieldValue={setFieldValue} 
                />
                <Items 
                  values={values} 
                  index={index} 
                  setFieldValue={setFieldValue} 
                />
              </div>
            )}
          </div>
          <div className='absolute bottom-0 inset-x-0 flex items-center space-x-3 p-5 bg-white border-t border-neutral-200'>
            <button 
              type="button" 
              onClick={submitForm}
              disabled={isSubmitting || errors.name || !values.name ? true : false} 
              className='py-1 px-5 rounded-sm text-sm text-neutral-800 font-bold border-2 border-neutral-800 disabled:opacity-25'
            >
              {isSubmitting ? <Spin /> : 'Tạo'}
            </button>
            <ErrorMessage name='error' component="div" className='text-xs text-pink-400 font-medium' />
          </div>
        </Form>
      )}
    </Formik>
  )
}

function Spin() {
  return <div className="h-4 w-4 animate-spin rounded-full border-4 border-white border-r-neutral-800" />
}