// Toolkit Imports
import { configureStore } from '@reduxjs/toolkit'

// Middleware
import middleware from '@/store/middleware'

// Reducers
import login from '@/store/user/login'
import pcs from '@/store/pcs/pcs'
import pc from '@/store/pcs/pc'
import reviews from '@/store/reviews'
import register from '@/store/user/register'

export const store = configureStore({
  reducer: { login, pcs, pc, reviews, register },
  middleware: [middleware],
})

export type AppDistach = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
