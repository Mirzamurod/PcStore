import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import address from './../controllers/addressController.js'

const router = express.Router()

// /api/address
router.get('/', protect, address.getAddress)
router.post('/add', protect, address.addAddress)
router.put('/update', protect, address.updateAddress)
router.delete('/delete/:id', protect, address.deleteAddress)

export default router
