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
import users from '@/store/admin/users'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: { login, pcs, pc, reviews, register, users },
  middleware: [middleware],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
