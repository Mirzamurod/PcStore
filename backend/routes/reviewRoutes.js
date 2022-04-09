import express from 'express'
import review from './../controllers/reviewController.js'
import { protect } from './../middleware/authMiddleware.js'

const router = express.Router()

// /api/reviews
router.get('/:id', review.getReviews)
router.post('/add', protect, review.addReview)
router.put('/update', protect, review.updateReview)
router.delete('/delete/:id', protect, review.deleteReview)

export default router
