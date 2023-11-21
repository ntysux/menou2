import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: boolean = false

export const updatingSlice = createSlice({
  name: 'updating',
  initialState,
  reducers: {
    setUpdating: (state, action: PayloadAction<boolean>) => {
      return action.payload
    }
  }
})

export const { setUpdating } = updatingSlice.actions