import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import filter from '../controllers/filterController.js'
import { filterField } from '../middleware/checkFields.js'

const router = express.Router()

// /api/filter
router
    .route('/')
    .get(filter.getFilter)
    .post(protect, filterField, filter.addFilter)
    .put(protect, filterField, filter.updateFilter)
router.route('/:id').get(filter.getFilters).delete(filter.deleteFilter)

export default router
