import { object, string, ref } from "yup"

export const schema = object({
  username: string()
    .required('Trống')
    .matches(/^[a-zA-Z0-9]+$/, 'Tên đăng nhập không hợp lệ.'),
  password: string()
    .required('Trống')
    .max(24, 'Mật khẩu không quá 24 kí tự')
    .min(8, 'Mật khẩu chứa tối thiểu 8 kí tự'),
  passwordConfirm: string()
    .required('Trống')
    .oneOf([ref('password')], 'Mật khẩu không khớp'),
  name: string()
    .required('Trống')
    .max(35, 'Tên người dùng không quá 35 kí tự')
    .matches(/^[a-zA-Z0-9\sđĐà-ỹÀ-Ỹ]+$/, 'Tên người dùng không hợp lệ.')
})