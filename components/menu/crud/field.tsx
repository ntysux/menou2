import { Field as FormikField } from "formik"
import { KeyboardEvent } from "react"
import { handleKeyDownAdd } from "./handle/add.key"
import { Init, Ref, SetFieldValue } from "./types/types"
import { handleClickAdd } from "./handle/add.click"
import { IconPlus } from "@tabler/icons-react"

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
        className='w-full outline-none border-2 border-neutral-800 p-2 pr-9 text-sm text-neutral-800 font-medium rounded-md'
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDownAdd(e, index, values, setFieldValue)}
      />
      {values.currents[index].trim() && 
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
  )
}