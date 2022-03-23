import User from './../models/userModel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'

const user = {
    // @desc Register new User
    // @route POST /api/users/add
    // @access Public
    register: expressAsyncHandler(async (req, res) => {
        const { username, fullname, email, password } = req.body

        if (
            !username ||
            !fullname ||
            !email ||
            !password ||
            username.length === 0 ||
            fullname.length === 0 ||
            email.length === 0 ||
            password.length === 0
        ) {
            res.status(400).json({ message: 'Please add all fields' })
            // throw new Error('Please add all fields')
        }

        // Check if user exists
        const userExists = await User.findOne({ email })

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        if (userExists) {
            res.status(400).json({ message: 'User already exists' })
            // throw new Error('User already exists')
        }

        const user = await User.create({ username, fullname, email, password: hashedPassword })

        if (user) res.status(201).json({ message: { message: 'User added', code: 0 } })
        else {
            res.status(400).json({ message: 'Invalid user data' })
            // throw new Error('Invalid user data')
        }
    }),

    // @desc Login User
    // @route POST /api/users/login
    // @access Public
    login: expressAsyncHandler(async (req, res) => {
        const { username, password } = req.body

        // check for user email
        const user = await User.findOne({ username })
        if (user && (await bcryptjs.compare(password, user.password)))
            res.status(200).json({ data: { token: generateToken(user._id) }, code: 0 })
        else {
            res.status(400).json({ message: 'User not found' })
            // throw new Error('User not found')
        }
    }),

    // @desc    Get users
    // @route   GET /api/users
    // @access  Private
    getUsers: expressAsyncHandler(async (req, res) => {
        const users = await User.find({})
        res.status(200).json(users)
    }),

    // @desc    Get user profile
    // @route   GET /api/users/profile
    // @access  Private
    getUser: expressAsyncHandler(async (req, res) => {
        // const user = await User.findById(req.params.id)
        const user = await User.findById(req.user.id)
        res.status(200).json({ data: user, message: {code: 0, message: 'success'} })
    }),
}

const generateToken = id => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14d' })
}

export default user
