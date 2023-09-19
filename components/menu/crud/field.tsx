import { Field as FormikField } from "formik"
import { KeyboardEvent } from "react"
import { handleKeyDownAdd } from "./handle/add.key"
import { Init, Ref, SetFieldValue } from "./types/types"
import { handleClickAdd } from "./handle/add.click"

interface Props {
  field: {
    name: string
    ref: Ref
  }
  index: number
  values: Init
  setFieldValue: SetFieldValue 
}

export default function Field({field, index, values, setFieldValue}: Props) {
  return (
    <div className='relative'>
      <FormikField
        innerRef={field.ref}
        name={`currents[${index}]`}
        placeholder={field.name}
        type="text"
        className={`
          w-full outline-none py-2 pr-20 text-sm text-neutral-800 font-medium rounded-sm
          focus:ring-2 focus:ring-neutral-800 focus:pl-2 transition-all
          ${values.currents[index] && 'ring-2 ring-neutral-800 pl-2'}
        `}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDownAdd(e, index, values, setFieldValue)}
      />
      {values.currents[index].trim() && 
        <button
          type="button" 
          className='absolute p-1 px-3 right-1 inset-y-1 text-xs text-white font-bold bg-neutral-800 rounded-sm'
          onClick={() => {
            field.ref.current?.focus()
            handleClickAdd(index, values, setFieldValue)
          }}
        >
          Thêm
        </button>
      }
    </div>
  )
}