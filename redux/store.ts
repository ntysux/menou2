import { configureStore } from '@reduxjs/toolkit'
import { menuSlice } from './menu/slice'
import { menuPublicSlice } from './menu.public/slice'
import { userSlice } from './user/slice'
import { communitySettingsSlice } from './community.settings/slice'
import { menuGroupSlice } from './menu.group/slice'

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    menuGroup: menuGroupSlice.reducer,
    menuPublic: menuPublicSlice.reducer,
    user: userSlice.reducer,
    communitySettings: communitySettingsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch