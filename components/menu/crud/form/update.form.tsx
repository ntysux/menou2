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
          <div className='grid grid-cols-5 gap-3'>
            <div className='flex flex-col col-span-3'>
              <label htmlFor="name" className='text-xs text-neutral-800 font-bold'>
                Tên món ăn
              </label>
              <FormikField 
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
          <div className='flex justify-end pt-3'>
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