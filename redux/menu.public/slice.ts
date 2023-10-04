import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { MenuPublicPreview } from "./types"

const initialState: MenuPublicPreview[] = []

export const menuPublicSlice = createSlice({
  name: 'menuPublic',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<MenuPublicPreview[]>) => [...action.payload]
  }
})

export const {
  init
} = menuPublicSlice.actions