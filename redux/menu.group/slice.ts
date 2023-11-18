import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MenuGroup } from "./types"

const initialState: MenuGroup[] = []

export const menuGroupSlice = createSlice({
  name: 'menuGroup',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<MenuGroup[]>) => [...action.payload],
    rename: (state, action: PayloadAction<{name: string, index: number}>) => {
      state[action.payload.index].name = action.payload.name
    },
    listAdd: (state, action: PayloadAction<{item: string, index: number}>) => {
      state[action.payload.index].list.unshift(action.payload.item)
    },

  }
})

export const { init, rename, listAdd } = menuGroupSlice.actions