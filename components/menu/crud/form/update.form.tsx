'use client'
import { useRef, useState, KeyboardEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Field as FormikField, Form, Formik, FormikHelpers } from 'formik'
import Items from '../items'
import Status from '../status'
import { update } from '@/redux/menu/slice'
import { schema } from '../validate/schema'
import { Init, OpenDialog } from '../types/types'
import { url } from '@/utils/app.url'
import { handleKeyDownAdd } from '../handle/add.key'
import { handleClickAdd } from '../handle/add.click'
import { IconPlus } from '@tabler/icons-react'

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
    stepsRef = useRef<HTMLInputElement | null>(null),
    [focus, setFocus] = useState([true, Boolean(description), ...Array(3).fill(false)])

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
        <Form className='space-y-9'>
          <div className='relative'>
            <label 
              htmlFor="name" 
              className={`absolute ${focus[0] ? '-top-1.5 text-xs font-bold text-neutral-800' : 'top-3 text-sm font-medium text-neutral-300'} transition-all`}
            >
              Tên món ăn
            </label>
            <FormikField 
              id='name'
              name='name' 
              type="text" 
              onFocus={() => setFocus([...focus.fill(true, 0, 1)])}
              onBlur={() => {
                !values.name && setFocus([...focus.fill(false, 0, 1)])
                setFieldValue('name', values.name.trim().replace(/ {2,}/g, ' '))
              }}
              className='w-full py-3 border-b-2 border-neutral-800 outline-none text-sm text-neutral-800 font-bold'
            />
          </div>

          <Status 
            values={values} 
            setFieldValue={setFieldValue} 
          />

          <div className='relative'>
            <label 
              htmlFor="description" 
              className={`absolute ${focus[1] ? '-top-5 text-xs font-bold text-neutral-800' : 'top-0 text-sm font-medium text-neutral-300'} transition-all`}
            >
              Mô tả
            </label>
            <FormikField 
              as='textarea'
              rows='3'
              id='description'
              name='description' 
              type="text"
              onFocus={() => setFocus([...focus.fill(true, 1, 2)])}
              onBlur={() => {
                !values.description && setFocus([...focus.fill(false, 1, 2)])
                setFieldValue('description', values.description?.trim().replace(/ {2,}/g, ' '))
              }}
              className='w-full outline-none border-b-2 border-neutral-800 text-sm text-neutral-600 font-medium resize-none hidden-scroll'
            />
          </div>
          {fields.map((field, index) => 
            <div 
              key={index} 
              className='relative'
            >
              <label 
                htmlFor={field.name} 
                className={`absolute z-10 transition-all ${focus[index + 2] ? '-top-1.5 text-xs font-bold text-neutral-800' : 'top-3 text-sm font-medium text-neutral-300'}`}
              >
                {field.name}
              </label>
              <div className='relative'>
                <FormikField
                  id={field.name}
                  type="text"
                  name={`currents[${index}]`}
                  innerRef={field.ref}
                  onFocus={() => setFocus([...focus.fill(true, index + 2, index + 3)])}
                  onBlur={() => !values.currents[index] && setFocus([...focus.fill(false, index + 2, index + 3)]) }
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDownAdd(e, index, values, setFieldValue)}
                  className='w-full outline-none border-b-2 border-neutral-800 py-3 pr-9 text-sm text-neutral-800 font-medium'
                />
                {
                  values.currents[index].trim() && 
                  <button
                    type="button" 
                    onClick={() => {
                      field.ref.current?.focus()
                      handleClickAdd(index, values, setFieldValue)
                    }}
                    className='absolute right-2 inset-y-2.5 text-neutral-800'
                  >
                    <IconPlus size='16px' strokeWidth='2.7' />
                  </button>
                }
              </div>
              <Items 
                values={values} 
                index={index} 
                setFieldValue={setFieldValue} 
              />
            </div>
          )}
          <div className='flex justify-end'>
            <button 
              type="button" 
              onClick={submitForm}
              disabled={isSubmitting || errors.name || !values.name ? true : false} 
              className='flex items-center justify-center text-sm text-neutral-800 font-bold disabled:opacity-50'
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
  return (
    <div className='p-0.5'>
      <div className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-800 border-r-white" />
    </div> 
  ) 
}