import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import checkFields from '../middleware/checkFields.js'
import user from './../controllers/userController.js'

const router = express.Router()

// /api/users
router.get('/', protect, admin, user.getUsers)
router.get('/profile', protect, user.getUser)
router.post('/add', checkFields(['username', 'fullname', 'email', 'password']), user.register)
router.post('/login', checkFields(['email', 'password']), user.login)
router.put('/update', protect, checkFields(['username', 'fullname', 'email', 'password']), user.update)
router.delete('/delete', protect, user.delete)

export default router
