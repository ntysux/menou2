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
        <Form className='space-y-3'>
          <div className='grid grid-cols-5 gap-3'>
            <div className='flex flex-col col-span-3'>
              <label htmlFor="name" className='text-xs text-neutral-800 font-bold'>
                Tên món ăn
              </label>
              <FormikField
                id='name'
                name='name' 
                type="text" 
                placeholder='Tên món ăn'
                onBlur={() => setFieldValue('name', values.name.trim().replace(/ {2,}/g, ' '))}
                className='max-w-md p-2.5 border-2 border-neutral-800 rounded-lg outline-none text-sm text-neutral-800 font-bold placeholder:text-neutral-300 placeholder:font-medium'
              />
            </div>
            <div className='col-span-2 flex flex-col'>
              <label className='text-xs text-neutral-800 font-bold'>
                Trạng thái
              </label>
              <Status 
                values={values} 
                setFieldValue={setFieldValue} 
              />
            </div>
          </div>
          <div className='flex flex-col gap-1 flex-1'>
            <label htmlFor="description" className='text-xs text-neutral-800 font-bold'>
              Mô tả
            </label>
            <FormikField 
              id='description'
              as='textarea'
              rows='3'
              name='description' 
              type="text"
              placeholder='Mô tả'
              onBlur={() => setFieldValue('description', values.description?.trim().replace(/ {2,}/g, ' '))}
              className='w-full p-2.5 outline-none border-2 border-neutral-800 text-sm text-neutral-600 font-medium resize-none rounded-lg hidden-scroll'
            />
          </div>
          <div className='space-y-3'>
            {fields.map((field, index) => 
              <div key={index} className='flex flex-col space-y-1'>
                <label 
                  htmlFor={field.name}
                  className='text-xs text-neutral-800 font-bold'
                >
                  {field.name}
                </label>
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
          
          <div className='flex justify-end pt-3'>
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