import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Menu } from "./types"

const initialState: Menu[] = []

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    initMenu: (state, action: PayloadAction<Menu[]>) => {
      state.push(...action.payload)
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.unshift(action.payload)
    },
    removeMenu: (state, action: PayloadAction<number>) => {
      state.fill({...state[action.payload], deleted: true}, action.payload, action.payload + 1)
    },
    updateMenu: (state, action: PayloadAction<{page: Menu, index: number}>) => {
      state.fill(action.payload.page, action.payload.index, action.payload.index + 1)
    },
    checkedMenu: (state, action: PayloadAction<{checked: boolean, index: number}>) => {
      state.fill({...state[action.payload.index], checked: action.payload.checked}, action.payload.index, action.payload.index + 1)
    },
    removeMultiMenu: (state) => {
      return [
        ...state.map(menu => {
          return menu.checked ? {...menu, deleted: true} : menu
        })
      ]
    },
  }
})

export const {initMenu, addMenu, removeMenu, updateMenu, checkedMenu, removeMultiMenu} = menuSlice.actions