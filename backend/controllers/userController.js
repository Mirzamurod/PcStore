import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from './../models/userModel.js'
import { validationResult } from 'express-validator'

const salt = await bcryptjs.genSalt(10)

const user = {
  /**
   * @desc    Get users
   * @route   GET /api/users
   * @access  Private
   */
  getUsers: expressAsyncHandler(async (req, res) => {
    const { limit, page, sortName, sortValue } = req.query
    if (+limit && +page) {
      const users = await User.find({}, { password: 0 })
        .sort(sortValue ? { [sortName]: sortValue } : sortName)
        .limit(+limit)
        .skip(+limit * (+page - 1))

      const pageLists = Math.ceil((await User.find({}, { password: 0 })).length / limit)

      res.status(200).json({ data: users, pageLists, page })
    } else {
      const users = await User.find({}, { password: 0 }).sort(
        sortValue ? { [sortName]: sortValue } : sortName
      )
      res.status(200).json({ data: users })
    }
  }),

  /**
   * @desc    Get user profile
   * @route   GET /api/users/profile
   * @access  Private
   */
  getUser: expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id, { password: 0 })
    if (!user) res.status(400).json({ success: false, message: 'User not found !!!' })
    else {
      if (user.isAdmin) {
        res.status(200).json({
          data: {
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            mode: user.mode,
            isAdmin: user.isAdmin,
          },
        })
      } else {
        res.status(200).json({
          data: {
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            mode: user.mode,
          },
        })
      }
    }
  }),

  /**
   * @desc Register new User
   * @route POST /api/users/add
   * @access Public
   */
  register: expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() })
    }

    const { username, fullname, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists)
      res
        .status(400)
        .json({ success: false, message: [{ msg: 'User already exists', param: 'email' }] })
    else {
      const hashedPassword = await bcryptjs.hash(password, salt)
      const user = await User.create({ username, fullname, email, password: hashedPassword })

      if (user) res.status(201).json({ message: 'User added', success: true })
      else res.status(400).json({ success: false, message: 'Invalid user data' })
    }
  }),

  /**
   * @desc Login User
   * @route POST /api/users/login
   * @access Public
   */
  login: expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
      if (await bcryptjs.compare(password, user.password))
        res.status(200).json({ data: { token: generateToken(user._id) }, success: true })
      else res.status(400).json({ success: false, message: 'Email or pasword wrong' })
    } else
      res.status(400).json({ success: false, message: [{ msg: 'User not found', param: 'email' }] })
  }),

  /**
   * @desc Edit User
   * @route PUT /api/users/update
   * @access Private
   */
  update: expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() })
    }

    const user = await User.findById(req.user.id)
    const { currentPassword } = req.body

    // Check User
    if (!user) {
      res.status(401)
      throw new Error('User not found!!!')
    } else {
      // Check Current Password
      if (currentPassword) {
        const hashedPassword = await bcryptjs.hash(req.body.newPassword.toString(), salt)
        if (bcryptjs.compare(currentPassword, user.password)) {
          await User.findByIdAndUpdate(
            req.user.id,
            { ...req.body, password: hashedPassword },
            { new: true }
          )
          res.status(200).json({ success: true, message: 'User Updated' })
        } else res.json({ code: 1 })
      } else {
        await User.findByIdAndUpdate(req.user.id, req.body)
        res.status(200).json({ success: true, message: 'User Updated' })
      }
    }
  }),

  /**
   * @desc Delete User
   * @route DELETE /api/users/delete
   * @access Private
   */
  delete: expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (user) {
      await User.findByIdAndRemove(req.user.id)
      res.status(200).json({ success: true, message: 'success' })
    } else res.status(400).json({ success: false, message: 'User not found !!!' })
  }),
}

const generateToken = id => jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14d' })

export default user
