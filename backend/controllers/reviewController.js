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
    // @route   POST /api/reviews/add
    // @access  Private
    addReview: expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)
        const { rating, comment, pcId } = req.body

        if (user) {
            if (rating === 0 || rating > 5 || !comment || comment.charAt(0) === ' ')
                res.status(400).json({ message: 'Please fill all fields' })
            else {
                await Review.create({
                    username: user.username,
                    rating,
                    comment,
                    pcId,
                })

                res.status(201).json({ message: { code: 0, message: 'success' } })
            }
        } else res.status(400).json({ message: 'User not found' })
    }),

    // @desc    Update Review
    // @route   PUT /api/reviews/update
    // @access  Private
    updateReview: expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)

        if (user) {
            await Review.findByIdAndUpdate(req.body._id, req.body, { new: true })
            res.status(200).json({ message: { code: 0, message: 'Updated Review' } })
        } else {
            res.status(400).json({ message: 'User not found !!!' })
        }
    }),

    // @desc    Delete Review
    // @route   DELETE /api/reviews/delete/:reviewId
    // @access  Private
    deleteReview: expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)

        if (user) {
            await Review.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: { code: 0, message: 'Deleted Review' } })
        } else res.status(400).json({ message: 'User not found !!!' })
    }),
}

export default review
