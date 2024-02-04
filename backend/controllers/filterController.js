import expressAsyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import Filter from './../models/filterModel.js'

const filter = {
  /**
   * @desc    Fetch all Filters
   * @route   GET /api/filters
   * @access  Private
   */
  getFilters: expressAsyncHandler(async (req, res) => {
    res.json(req.body)
  }),

  /**
   * @desc    Fetch all Filters
   * @route   GET /api/filters/:filterId
   * @access  Private
   */
  getFilter: expressAsyncHandler(async (req, res) => {
    res.json(req.body)
  }),

  // @desc    Add Filter
  // @route   POST /api/filters
  // @access  Private
  addFilter: expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } else res.json(req.body)
  }),

  // @desc    Update Filter
  // @route   PUT /api/filters
  // @access  Private
  updateFilter: expressAsyncHandler(async (req, res) => {
    res.json(req.body)
  }),

  // @desc    Delete Filter
  // @route   DELETE /api/filters/:filterId
  // @access  Private
  deleteFilter: expressAsyncHandler(async (req, res) => {
    res.json(req.body)
  }),
}

export default filter
