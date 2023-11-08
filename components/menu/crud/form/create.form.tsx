'use client'
import { useRef } from 'react'
import { Field as FormikField, Form, Formik, FormikHelpers } from 'formik'
import Field from '../field'
import Items from '../items'
import Status from '../status'
import { add } from '@/redux/menu/slice'
import { Menu } from '@/redux/menu/types'
import { schema } from '../validate/schema'
import { useAppDispatch } from '@/redux/hooks'
import { Init, OpenDialog } from '../types/types'
import { url } from '@/utils/app.url'
import ErrorDialog from '@/components/error.dialog'

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
  const 
    materialsRef = useRef<HTMLInputElement | null>(null),
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
    description: '',
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
          <FormikField 
            as='textarea'
            rows='3'
            name='description' 
            type="text"
            placeholder='Mô tả'
            className='
              outline-none p-3 pl-0 w-full text-sm text-neutral-600 font-medium resize-none rounded-sm min-h-full hidden-scroll
              focus:pl-3 focus:ring-2 focus:ring-neutral-800 transition-all
            '
            onBlur={() => setFieldValue('description', values.description?.trim().replace(/ {2,}/g, ' '))}
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
          
          <div className='flex justify-end pt-3 border-t border-neutral-300'>
            <button 
              type="button" 
              onClick={submitForm}
              disabled={isSubmitting || errors.name || !values.name ? true : false} 
              className='p-1 px-9 bg-neutral-800 rounded-sm flex items-center justify-center text-sm text-white font-medium disabled:opacity-50'
            >
              {isSubmitting ? <Spin /> : 'Tạo'}
            </button>
          </div>
          <ErrorDialog 
            state={Boolean(errors.error)} 
            text={errors.error!}
          />
        </Form>
      )}
    </Formik>
  )
}

function Spin() {
  return <div className='p-0.5'>
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-800 border-r-white" />
  </div> 
}