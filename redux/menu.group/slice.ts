import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MenuGroup } from "./types"

const initialState: MenuGroup[] = []

export const menuGroupSlice = createSlice({
  name: 'menuGroup',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<MenuGroup[]>) => [...action.payload],
    create: (state, action: PayloadAction<MenuGroup>) => {
      state.unshift(action.payload)
    },
    rename: (state, action: PayloadAction<{name: string, index: number}>) => {
      state[action.payload.index].name = action.payload.name
    },
    // listAdd: (state, action: PayloadAction<{item: string, index: number}>) => {
    //   state[action.payload.index].list.unshift(action.payload.item)
    // },
    // listRemove: (state, action: PayloadAction<{pageIndex: number, itemIndex: number}>) => {
    //   state[action.payload.pageIndex].list.splice(action.payload.itemIndex, 1)
    // }
  }
})

export const { 
  init, 
  create, 
  rename, 
  // listAdd, 
  // listRemove 
} = menuGroupSlice.actions