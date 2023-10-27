import { Menu } from "../menu/types"

export interface Comment {
  user: {
    id: string
    name: string
    verified: boolean 
  }
  comment: string
}

export interface Author {
  name: string 
  verified: boolean
}

export type MenuPublic = Omit<Menu, 'deleted' | 'status' | 'checked' | 'color'> & {
  author: Author
  comments: Comment[]
}