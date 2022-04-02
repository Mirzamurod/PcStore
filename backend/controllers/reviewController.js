import expressAsyncHandler from 'express-async-handler'
import User from './../models/userModel.js'
import Review from './../models/reviewModel.js'

const review = {
    // @desc    Get Reviews in Pc
    // @route   GET /api/reviews/:pcId
    // @access  Public
    getReviews: expressAsyncHandler(async (req, res) => {
        const reviews = await Review.find({ pcId: req.params.id })

        if (reviews) res.status(200).json({ data: reviews, message: 'Reviews' })
        else res.status(400).json({ message: 'Pc not found !!!' })
    }),

    // @desc    Add Review
    // @route   POST /api/reviews/add/:pcId
    // @access  Private
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

    // @desc    Update Review
    // @route   PUT /api/reviews/update/:pcId
    // @access  Private
    updateReview: expressAsyncHandler(async (req, res) => {
        console.log('Update Review')
    }),

    // @desc    Delete Review
    // @route   DELETE /api/reviews/delete/:pcId
    // @access  Private
    deleteReview: expressAsyncHandler(async (req, res) => {
        console.log('Delete Review')
    }),
}

export default review
