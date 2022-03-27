import {configureStore} from '@reduxjs/toolkit'
import userSlice from './reducer/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: [],
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
