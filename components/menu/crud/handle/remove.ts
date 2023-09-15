import { FormikErrors } from "formik"
import { Init } from "../types"

export function handleRemove(
  index: number,
  key: number,
  values: Init, 
  setFieldValue: (field: string, value: any) => Promise<void | FormikErrors<Init>>
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