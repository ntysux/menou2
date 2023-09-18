import { Init, SetFieldValue } from "../types/types"

export function handleClickAdd(
  index: number,
  values: Init, 
  setFieldValue: SetFieldValue
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