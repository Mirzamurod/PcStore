import express from 'express'
import { check } from 'express-validator'
import { protect } from '../middleware/authMiddleware.js'
import { addressField } from '../middleware/checkFields.js'
import address from './../controllers/addressController.js'

const router = express.Router()

// /api/address
router.get('/', protect, address.getAddress)
router.post('/add', protect, addressField, address.addAddress)
router.put(
  '/update',
  protect,
  addressField,
  check('id').notEmpty().withMessage('This field is required'),
  address.updateAddress
)
router.delete('/delete/:id', protect, address.deleteAddress)

export default router
