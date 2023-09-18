import { Init } from "../types/types"
import { FormikErrors } from "formik"

export function handleClickAdd(
  index: number,
  values: Init, 
  setFieldValue: (field: string, value: any) => Promise<void | FormikErrors<Init>>
) {
  setFieldValue('library', 
    [...values.library.fill(
      [...values.library[index], values.currents[index].trim().replace(/ {2,}/g, ' ')], 
      index, 
      index + 1
    )]
  )
  
  setFieldValue('currents', [...values.currents.fill('', index, index + 1)])
}