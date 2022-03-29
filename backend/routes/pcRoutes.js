import express from 'express'
import pc from './../controllers/pcController.js'
import { protect } from './../middleware/authMiddleware.js'

const router = express.Router()

// /api/pc
router.get('/', pc.getPc)
router.get('/:id', pc.getPcById)
router.post('/addreview/:id', protect, pc.addReview)
router.get('/reviews/:id', pc.reviews)

export default router
