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

    // @desc Add review
    // @route POST /api/pcs/addreview/:pcId
    // @access Private
    addReview: expressAsyncHandler(async (req, res) => {
        const { rating, comment } = req.body
        const pcId = req.params.id

        if (rating === 0 || rating > 5 || !comment || comment.charAt(0) === ' ')
            res.status(400).json({ message: 'Please fill all fields' })
        else {
            await Review.create({
                username: req.user.username,
                rating,
                comment,
                pcId,
            })

            res.status(201).json({ message: { code: 0, message: 'success' } })
        }
    }),

    // @desc Get reviews
    // @route GET /api/pcs/reviews/:pcId
    // @access Public
    reviews: expressAsyncHandler(async (req, res) => {
        const review = await Review.find({ pcId: req.params.id })
        res.status(200).json({ data: review, message: { code: 0, message: 'success' } })
    }),
}

export default pc
