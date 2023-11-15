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
    }
  }
})

export const { init, rename } = menuGroupSlice.actions