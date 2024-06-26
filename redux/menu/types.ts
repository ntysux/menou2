export interface Menu {
  id: string
  uid: string
  name: string
  description?: string
  deleted: boolean
  materials?: string
  required?: string
  steps?: string
  status: boolean
  checked?: boolean,
  color?: string
} 