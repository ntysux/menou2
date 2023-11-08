'use client'
import { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Field as FormikField, Form, Formik, FormikHelpers } from 'formik'
import Field from '../field'
import Items from '../items'
import Status from '../status'
import { update } from '@/redux/menu/slice'
import { schema } from '../validate/schema'
import { Init, OpenDialog } from '../types/types'
import { url } from '@/utils/app.url'

async function handleApi(name: string, status: boolean, description: string | undefined, library: string[][], id: string) {
  const response = await fetch(`${url}/menu/api/update`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, name, description, library, status})
  })
  const result: {id: string} = await response.json()
  return result
}

export default function UpdateForm({pageIndex, setOpen}: {pageIndex: number, setOpen: OpenDialog}) {
  const 
    dispatch = useAppDispatch(),
    {name, status, description, materials, required, steps, ...rest} = useAppSelector(state => state.menu)[pageIndex], 
    materialsRef = useRef<HTMLInputElement | null>(null),
    requiredRef = useRef<HTMLInputElement | null>(null),
    stepsRef = useRef<HTMLInputElement | null>(null)

  const fields = [
    {name: 'Nguyên liệu', ref: materialsRef},
    {name: 'Chuẩn bị', ref: requiredRef}, 
    {name: 'Chế biến', ref: stepsRef}
  ]

  const init: Init = {
    name,
    status,
    description,
    currents: Array(3).fill(''), 
    library: [
      materials?.split('|') ?? [],
      required?.split('|') ?? [],
      steps?.split('|') ?? [],
    ]
  }

  async function handleSubmit(values: Init, {setSubmitting}: FormikHelpers<Init>) {
    setSubmitting(true)
    const {name, status, description, library} = values
    const result = await handleApi(name, status, description, library, rest.id)
    if (result.id) {
      dispatch(update({
        page: {
          ...rest,
          name,
          description,
          materials: library[0].length ? library[0].join('|') : undefined,
          required: library[1].length ? library[1].join('|') : undefined,
          steps: library[2].length ? library[2].join('|') : undefined,
          status
        }, 
        index: pageIndex
      }))
      setOpen(false)
    } else {
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
              {isSubmitting ? <Spin /> : 'Lưu'}
            </button>
          </div>
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