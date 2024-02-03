import expressAsyncHandler from 'express-async-handler'
import User from './../models/userModel.js'
import Review from './../models/reviewModel.js'
import Pc from './../models/pcModel.js'
import { validationResult } from 'express-validator'
import { decode } from 'js-base64'

const review = {
  /**
   * @desc    Get Reviews in Pc
   * @route   GET /api/reviews/:pcId
   * @access  Public
   */
  getReviews: expressAsyncHandler(async (req, res) => {
    const { limit, page, sortName, sortValue } = req.query
    if (+limit && +page) {
      const reviews = await Review.find({ pcId: decode(req.params.id) })
        .sort(sortValue ? { [sortName]: sortValue } : sortName)
        .limit(+limit)
        .skip(+limit * (+page - 1))

      const pageLists = Math.ceil(
        (await Review.find({ pcId: decode(req.params.id) })).length / limit
      )

      res.status(200).json({ data: reviews, pageLists, page })
    } else {
      const reviews = await Review.find({ pcId: decode(req.params.id) }).sort(
        sortValue ? { [sortName]: sortValue } : sortName
      )
      res.status(200).json({ data: reviews })
    }
    // const reviews = await Review.find({ pcId: req.params.id })

    // if (reviews) res.status(200).json({ data: reviews })
    // else res.status(400).json({ success: false, message: 'Pc not found !!!' })
  }),

  /**
   * @desc    Add Review
   * @route   POST /api/reviews/:id
   * @access  Private
   */
  addReview: expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const user = await User.findById(req.user.id)
    const { rating, comment } = req.body

    const existsPc = await Pc.findById(decode(req.params.id))

    if (existsPc) {
      await Review.create({
        username: user.username,
        rating,
        comment,
        pcId: decode(req.params.id),
      })

      res.status(201).json({ success: true, message: 'Message successfully added' })
    } else res.status(400).json({ success: false, message: 'Pc not found' })
  }),

  /**
   * @desc    Update Review
   * @route   PUT /api/reviews/update
   * @access  Private
   */
  updateReview: expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const user = await User.findById(req.user.id)

    if (user) {
      await Review.findByIdAndUpdate(req.body._id, req.body, { new: true })
      res.status(200).json({ success: true, message: 'Updated Review' })
    } else res.status(400).json({ success: false, message: 'User not found !!!' })
  }),

  /**
   * @desc    Delete Review
   * @route   DELETE /api/reviews/delete/:reviewId
   * @access  Private
   */
  deleteReview: expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (user) {
      await Review.findByIdAndDelete(req.params.id)
      res.status(200).json({ success: true, message: 'Deleted Review' })
    } else res.status(400).json({ success: false, message: 'User not found !!!' })
  }),
}

export default review
