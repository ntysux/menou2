import { FormikErrors } from "formik"
import { Dispatch, MutableRefObject, SetStateAction } from "react"

export interface Init {
  name: string
  status: boolean
  description?: string
  currents: string[]
  library: string[][]
  error?: string
}

export type SetFieldValue = (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<Init>>
export type Ref = MutableRefObject<HTMLInputElement | null>
export type OpenDialog = Dispatch<SetStateAction<boolean>>