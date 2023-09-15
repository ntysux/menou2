import { KeyboardEvent } from "react"
import { Init } from "../types"
import { FormikErrors } from "formik"

export function handleKeyDownAdd(
  event: KeyboardEvent<HTMLInputElement>, 
  index: number,
  values: Init, 
  setFieldValue: (field: string, value: any) => Promise<void | FormikErrors<Init>>
) {
  if(event.key === 'Enter' && values.currents[index].trim()) {
    setFieldValue('library', 
      [...values.library.fill(
        [...values.library[index], values.currents[index].trim().replace(/ {2,}/g, ' ')], 
        index, 
        index + 1
      )]
    )
    
    setFieldValue('currents', [...values.currents.fill('', index, index + 1)])
  }
}