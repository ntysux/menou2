import { Menu } from "../menu/types"
import { User } from "../user/types"

export interface Comment {
  user: User
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