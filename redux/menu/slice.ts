import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Menu } from "./types"

const initialState: Menu[] = []

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Menu[]>) => [...action.payload],
    add: (state, action: PayloadAction<Menu>) => {
      state.unshift(action.payload)
    },
    update: (state, action: PayloadAction<{page: Menu, index: number}>) => {
      state.fill(action.payload.page, action.payload.index, action.payload.index + 1)
    },
    remove: (state, action: PayloadAction<number>) => {
      state.fill({...state[action.payload], deleted: true, checked: undefined}, action.payload, action.payload + 1)
    },
    removeMulti: (state) => {
      return [
        ...state.map(menu => {
          return menu.checked ? {...menu, deleted: true, checked: undefined} : menu
        })
      ]
    },
    check: (state, action: PayloadAction<{checked: boolean, index: number}>) => {
      state.fill({...state[action.payload.index], checked: action.payload.checked}, action.payload.index, action.payload.index + 1)
    },
    checkAll: (state, action: PayloadAction<boolean>) => {
      return [
        ...state.map(menu => {
          return !menu.deleted ? {...menu, checked: action.payload} : menu
        })
      ]
    },
    checkAllDeleted: (state, action: PayloadAction<boolean>) => {
      return [
        ...state.map(menu => {
          return menu.deleted ? {...menu, checked: action.payload} : menu
        })
      ]
    },
    changeColor: (state, action: PayloadAction<{color: string, index: number}>) => {
      state.fill({...state[action.payload.index], color: action.payload.color}, action.payload.index, action.payload.index + 1)
    },
    changeColorMulti: (state, action: PayloadAction<string>) => {
      return [
        ...state.map(menu => {
          return menu.checked ? {...menu, color: action.payload} : menu
        })
      ]
    },
    restoreMulti: (state) => {
      return [
        ...state.map(menu => {
          return menu.checked ? {...menu, deleted: false, checked: undefined} : menu
        })
      ]
    },
  }
})

export const {
  init, 
  add, 
  update, 
  remove, 
  removeMulti, 
  check, 
  checkAll, 
  checkAllDeleted, 
  changeColor, 
  changeColorMulti, 
  restoreMulti
} = menuSlice.actions