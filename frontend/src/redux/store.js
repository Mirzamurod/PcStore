import { configureStore } from '@reduxjs/toolkit'
import middleware from './middleware'
import { pcs, pc, login, register, reviews } from '.'

export default configureStore({
    reducer: { pcs, pc, login, register, reviews },
    middleware: [middleware],
})
