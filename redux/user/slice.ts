import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "./types"

const initialState: User = {
  id: '',
  name: '',
  verified: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.verified = action.payload.verified
    }
  }
})

export const {
  init
} = userSlice.actions