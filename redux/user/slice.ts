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
      return {...action.payload}
    }
  }
})

export const { init } = userSlice.actions