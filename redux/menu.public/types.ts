import { Menu } from "../menu/types"

export interface Comment {
  user: {
    id: string,
    name: string
    verified: boolean 
  }
  comment: string
}

export type MenuPublic = Omit<Menu, 'deleted' | 'status' | 'checked' | 'color'> & {
  uname: string 
  verified: boolean
  comment: Comment[]
}