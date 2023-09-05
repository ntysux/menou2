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
    }
  }
})

export const {initMenu, addMenu, removeMenu, updateMenu} = menuSlice.actions