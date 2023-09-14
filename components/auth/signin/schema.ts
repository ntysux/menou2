import { object, string } from "yup"

export const schema = object({
  username: string().required('Trống'),
  password: string().required('Trống')
})