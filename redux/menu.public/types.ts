import { Menu } from "../menu/types"
import { User } from "../user/types"

export interface Comment {
  user: User
  comment: string
}

export type Author = Omit<User, 'id'>

export type MenuPublic = Omit<Menu, 'deleted' | 'status' | 'checked' | 'color'> & {
  lastEditedTime: string
  author: Author
  comments: Comment[]
}