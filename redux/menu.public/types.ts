import { Menu } from "../menu/types"

export interface Comment {
  user: {
    id: string
    name: string
    verified: boolean 
  }
  comment: string
}

export type MenuPublic = Omit<Menu, 'deleted' | 'status' | 'checked' | 'color'> & {
  author: {
    name: string 
    verified: boolean
  }
  comments: Comment[]
}

export type MenuPublicPreview = Omit<MenuPublic, 'comments'>