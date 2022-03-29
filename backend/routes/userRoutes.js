import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import user from './../controllers/userController.js'

const router = express.Router()

// /api/users
router.get('/', protect, admin, user.getUsers)
router.get('/profile', protect, user.getUser)
router.post('/add', user.register)
router.post('/login', user.login)
router.put('/update', protect, user.update)
router.delete('/delete', protect, user.delete)

export default router
