import express from 'express'
import pc from './../controllers/pcController.js'
import { protect, admin } from './../middleware/authMiddleware.js'

const router = express.Router()

// /api/pc
router.get('/', pc.getPc)
router.get('/:id', pc.getPcById)
router.post('/add', protect, admin, pc.addPc)
router.put('/update', protect, admin, pc.updatePc)
router.delete('/:id', protect, admin, pc.deletePc)

export default router
