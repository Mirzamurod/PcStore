import { configureStore } from '@reduxjs/toolkit'
import middleware from './middleware'
import pcs from './pcs/pcs'
import pc from './pcs/pc'
import login from './user/login'
import register from './user/register'
import reviews from './reviews/reviews'

export default configureStore({
    reducer: { pcs, pc, login, register, reviews },
    middleware: [middleware],
})
