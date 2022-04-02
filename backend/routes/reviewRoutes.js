import express from 'express'
import review from './../controllers/reviewController.js'
import { protect } from './../middleware/authMiddleware.js'

const router = express.Router()

// /api/reviews
router.get('/:id', review.getReviews)
router.post('/add/:id', protect, review.addReview)
router.post('/update/:id', protect, review.updateReview)
router.post('/delete/:id', protect, review.deleteReview)

export default router
