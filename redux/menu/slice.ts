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
    checkedMultiMenu: (state, action: PayloadAction<boolean>) => {
      return [
        ...state.map(menu => {
          return {...menu, checked: action.payload}
        })
      ]
    },
    removeMultiMenu: (state) => {
      return [
        ...state.map(menu => {
          return menu.checked ? {...menu, deleted: true} : menu
        })
      ]
    },
    changeColorSingleMenu: (state, action: PayloadAction<{color: string, index: number}>) => {
      state.fill({...state[action.payload.index], color: action.payload.color}, action.payload.index, action.payload.index + 1)
    },
    changeColorMultiMenu: (state, action: PayloadAction<string>) => {
      return [
        ...state.map(menu => {
          return menu.checked ? {...menu, color: action.payload} : menu
        })
      ]
    },
  }
})

export const {
  initMenu, 
  addMenu, 
  updateMenu, 
  checkedMenu,
  checkedMultiMenu, 
  removeMenu, 
  removeMultiMenu,
  changeColorSingleMenu,
  changeColorMultiMenu
} = menuSlice.actions