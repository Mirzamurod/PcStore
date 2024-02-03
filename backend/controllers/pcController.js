import expressAsyncHandler from 'express-async-handler'
import { decode } from 'js-base64'
import Review from '../models/reviewModel.js'
import Pc from './../models/pcModel.js'

const pc = {
  /**
   * @desc    Fetch all pcs
   * @route   GET /api/pcs
   * @access  Public
   */
  getPc: expressAsyncHandler(async (req, res) => {
    const { limit, page, sortName, sortValue } = req.query
    if (+limit && +page) {
      const pcs = await Pc.find({})
        .sort(sortValue ? { [sortName]: sortValue } : sortName)
        .limit(+limit)
        .skip(+limit * (+page - 1))

      const pageLists = Math.ceil((await Pc.find({})).length / limit)

      res.status(200).json({ data: pcs, pageLists, page })
    } else {
      const pcs = await Pc.find({}).sort(sortValue ? { [sortName]: sortValue } : sortName)
      res.status(200).json({ data: pcs })
    }
  }),

  /**
   * @desc    Fetch single pc
   * @route   GET /api/pcs/:pcId
   * @access  Public
   */
  getPcById: expressAsyncHandler(async (req, res) => {
    let rating = 0
    const pc = await Pc.findById(decode(req.params.id))
    const reviewNum = await Review.find({ pcId: decode(req.params.id) })
    reviewNum.forEach(num => (rating += num.rating))

    if (pc)
      res.status(200).json({
        data: pc,
        ratingNum: rating / reviewNum?.length,
        reviewNum: reviewNum?.length,
      })
    else res.status(400).json({ success: false, message: 'Pc not found' })
  }),

  /**
   * @desc    Add new Pc
   * @route   POST /api/pcs/add
   * @access  Private
   */
  addPc: expressAsyncHandler(async (req, res) => {
    const {
      name,
      image,
      cpu,
      motherboard,
      cooler,
      ddr,
      videocard,
      hdd,
      ssd_sata,
      ssd_m2,
      price,
      rating,
      category,
      description,
      warranty,
      have,
    } = req.body
  }),

  /**
   * @desc    Update Pc
   * @route   PUT /api/pcs/update
   * @access  Private
   */
  updatePc: expressAsyncHandler(async (req, res) => {
    console.log('Update Pc')
  }),

  /**
   * @desc    Delete Pc
   * @route   DELETE /api/pcs/:pcId
   * @access  Private
   */
  deletePc: expressAsyncHandler(async (req, res) => {
    const pc = await Pc.findByIdAndRemove(req.params.id)

    if (!!pc) res.status(200).json({ message: 'Pc deleted', success: true })
    else res.status(400).json({ message: 'Pc not Found', success: false })
  }),
}

export default pc
