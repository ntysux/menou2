import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CommunitySettings } from "./types"

const initialState: CommunitySettings = {
  layout: null,
  display: null
}

export const communitySettingsSlice = createSlice({
  name: 'communitySettings',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<CommunitySettings>) => {
      return {...action.payload}
    },
    setLayout: (state, action: PayloadAction<boolean>) => {
      state.layout = action.payload
    },
    setDisplay: (state, action: PayloadAction<'global' | 'personal'>) => {
      state.display = action.payload
    }
  }
})

export const { init, setLayout, setDisplay } = communitySettingsSlice.actions