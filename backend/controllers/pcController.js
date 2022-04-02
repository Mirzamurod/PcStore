import expressAsyncHandler from 'express-async-handler'
import Review from '../models/reviewModel.js'
import Pc from './../models/pcModel.js'

const pc = {
    // @desc    Fetch all pcs
    // @route   GET /api/pcs
    // @access  Public
    getPc: expressAsyncHandler(async (req, res) => {
        const pcs = await Pc.find({})
        res.status(200).json({ data: pcs, message: { code: 0, message: 'success' } })
    }),

    // @desc    Fetch single pc
    // @route   GET /api/pcs/:pcId
    // @access  Public
    getPcById: expressAsyncHandler(async (req, res) => {
        let rating = 0
        const pc = await Pc.findById(req.params.id)
        const reviewNum = await Review.find({ pcId: req.params.id })
        reviewNum.forEach(num => (rating += num.rating))

        if (pc)
            res.status(200).json({
                data: pc,
                ratingNum: rating / reviewNum?.length,
                reviewNum: reviewNum?.length,

                message: { code: 0, message: 'success' },
            })
        else res.status(400).json({ message: 'Pc not found' })
    }),

    // @desc    Add new Pc
    // @route   POST /api/pcs/add
    // @access  Private
    addPc: expressAsyncHandler(async (req, res) => {
        console.log('Add Pc')
    }),

    // @desc    Update Pc
    // @route   PUT /api/pcs/update
    // @access  Private
    updatePc: expressAsyncHandler(async (req, res) => {
        console.log('Update Pc')
    }),

    // @desc    Delete Pc
    // @route   DELETE /api/pcs/delete/:pcId
    // @access  Private
    deletePc: expressAsyncHandler(async (req, res) => {
        console.log('Delete Pc')
    }),
}

export default pc
