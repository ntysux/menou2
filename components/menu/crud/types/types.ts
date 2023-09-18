import { FormikErrors } from "formik"
import { MutableRefObject } from "react"

export interface Init {
  name: string
  status: boolean
  currents: string[]
  library: string[][]
  error: string
}

export type SetFieldValue = (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<Init>>
export type Ref = MutableRefObject<HTMLInputElement | null>