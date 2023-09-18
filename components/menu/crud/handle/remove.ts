import { Init, SetFieldValue } from "../types/types"

export function handleRemove(
  index: number,
  key: number,
  values: Init, 
  setFieldValue: SetFieldValue
) {
  setFieldValue('library', 
    [...values.library
      .fill(
        [...values.library[index].slice(0, key), ...values.library[index].slice(key + 1)], 
        index, index + 1
      )
    ]
  )
}