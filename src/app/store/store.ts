import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './slices/moviesSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    user: userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch