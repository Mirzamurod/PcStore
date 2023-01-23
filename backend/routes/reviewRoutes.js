import express from 'express'
import review from './../controllers/reviewController.js'
import { protect } from './../middleware/authMiddleware.js'
import { reviewAddField, reviewEditField } from '../middleware/checkFields.js'

const router = express.Router()

// /api/reviews
router.get('/:id', review.getReviews)
router.post('/add', protect, reviewAddField, review.addReview)
router.put('/update', reviewEditField, review.updateReview)
router.delete('/delete/:id', protect, review.deleteReview)

export default router
