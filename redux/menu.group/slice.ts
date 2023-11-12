import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MenuGroup } from "./types"

const initialState: MenuGroup[] = []

export const menuGroupSlice = createSlice({
  name: 'menuGroup',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<MenuGroup[]>) => [...action.payload]
  }
})

export const { init } = menuGroupSlice.actions