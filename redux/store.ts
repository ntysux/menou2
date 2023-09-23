import { configureStore } from '@reduxjs/toolkit'
import { menuSlice } from './menu/slice'
import { menuPublicSlice } from './menu.public/slice'

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    menuPublic: menuPublicSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch