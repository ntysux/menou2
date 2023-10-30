import { Menu } from "../menu/types"
import { User } from "../user/types"

export interface Comment {
  user: User
  comment: string
}

export type MenuPublic = Omit<Menu, 'deleted' | 'status' | 'checked' | 'color'> & {
  lastEditedTime: string
  author: User
  comments: Comment[]
}