import { Menu } from "../menu/types"

export type MenuPublic = Omit<Menu, 'deleted' | 'status' | 'checked' | 'color'> & {uname: string}