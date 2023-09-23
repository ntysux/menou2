import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MenuPublic } from "./types"

const initialState: MenuPublic[] = []

export const menuPublicSlice = createSlice({
  name: 'menuPublic',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<MenuPublic[]>) => [...action.payload]
  }
})

export const {
  init
} = menuPublicSlice.actions