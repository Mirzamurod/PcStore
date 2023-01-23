import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import user from './../controllers/userController.js'
import { userAddField, userLoginField, userUpdateField } from '../middleware/checkFields.js'

const router = express.Router()

// /api/users
router.get('/', protect, admin, user.getUsers)
router.get('/profile', protect, user.getUser)
router.post('/add', userAddField, user.register)
router.post('/login', userLoginField, user.login)
router.put('/update', protect, userUpdateField, user.update)
router.delete('/delete', protect, user.delete)

export default router
