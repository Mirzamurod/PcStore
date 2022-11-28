import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from './../models/userModel.js'

const salt = await bcryptjs.genSalt(10)

const user = {
    // @desc    Get users
    // @route   GET /api/users
    // @access  Private
    getUsers: expressAsyncHandler(async (req, res) => {
        const users = await User.find({})
        if (!users) res.status(400).json({ message: 'Users not found!!!' })
        else res.status(200).json(users)
    }),

    // @desc    Get user profile
    // @route   GET /api/users/profile
    // @access  Private
    getUser: expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)
        if (!user) res.status(400).json({ message: 'User not found !!!' })
        else {
            if (user.isAdmin) {
                res.status(200).json({
                    data: {
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                        dark_mode: user.dark_mode,
                        isAdmin: user.isAdmin,
                    },
                    message: { code: 0, message: 'success' },
                })
            } else {
                res.status(200).json({
                    data: {
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                        dark_mode: user.dark_mode,
                    },
                    message: { code: 0, message: 'success' },
                })
            }
        }
    }),

    // @desc Register new User
    // @route POST /api/users/add
    // @access Public
    register: expressAsyncHandler(async (req, res) => {
        const { username, fullname, email, password } = req.body

        // Check fields
        if (
            // !!username &&
            // !!fullname &&
            // !!email &&
            // !!password &&
            !/[^A-Za-z0-9]+/g.test(username) &&
            /[A-z]+\s[A-z]+/.test(fullname) &&
            /[\w.]+@\w+\.(com|ru)/.test(email) &&
            password.length > 7 &&
            password.length < 17
        ) {
            // Check if user exists
            const userExists = await User.findOne({ email })

            if (userExists) res.status(400).json({ message: { email: 'User already exists' } })
            else {
                const hashedPassword = await bcryptjs.hash(password, salt)
                const user = await User.create({ ...req.body, password: hashedPassword })

                if (user) res.status(201).json({ message: { message: 'User added', code: 0 } })
                else res.status(400).json({ message: { toast: 'Invalid user data' } })
            }
        } else {
            // Check if empty field
            let message = {}
            Object.entries({ username, fullname, email, password }).forEach(([key, value]) => {
                if (!!!req.body[key]) message[key] = value
            })

            // const keys = Object.keys(message)
            // keys.forEach(key => (message[key] = 'This field is required!!!'))

            if (!!username)
                if (/[^A-Za-z0-9]+/g.test(username)) message.username = 'This is not Username'
            if (!!fullname)
                if (!/[A-z]+\s[A-z]+/.test(fullname)) message.fullname = 'This is not Fullname'
            if (!!email)
                if (!/[\w.]+@\w+\.(com|ru)/.test(email)) message.email = 'This is not Email'
            if (!!password) {
                if (password.length < 8) message.password = 'Minimum 8 letters'
                if (password.length > 16) message.password = 'Maximum 16 letters'
            }

            res.status(400).json({ message })
        }
    }),

    // @desc Login User
    // @route POST /api/users/login
    // @access Public
    login: expressAsyncHandler(async (req, res) => {
        const { email, password } = req.body

        // Check fields
        if (
            // !!email &&
            // !!password &&
            /[\w.]+@\w+\.(com|ru)/.test(email) &&
            password.length > 7 &&
            password.length < 17
        ) {
            const user = await User.findOne({ email })
            if (user) {
                if (await bcryptjs.compare(password, user.password))
                    res.status(200).json({ data: { token: generateToken(user._id) }, code: 0 })
                else res.status(400).json({ message: { password: 'Password is wrong' } })
            } else res.status(400).json({ message: { email: 'User not found' } })
        } else {
            let message = {}
            Object.entries({ email, password }).forEach(([key, value]) => {
                if (!!!req.body[key]) message[key] = value
            })

            const keys = Object.keys(message)
            keys.forEach(key => (message[key] = 'This field is required!!!'))

            if (!!email)
                if (!/[\w.]+@\w+\.(com|ru)/.test(email)) message.email = 'This is not Email'
            if (!!password) {
                if (password.length < 8) message.password = 'Minimum 8 letters'
                if (password.length > 16) message.password = 'Maximum 16 letters'
            }

            res.status(400).json({ message })
        }
    }),

    // @desc Edit User
    // @route PUT /api/users/update
    // @access Private
    update: expressAsyncHandler(async (req, res) => {
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
                    res.status(200).json({ message: { code: 0, message: 'User Updated' } })
                } else res.json({ code: 1 })
            } else {
                await User.findByIdAndUpdate(req.user.id, req.body)
                res.status(200).json({ message: { code: 0, message: 'User Updated' } })
            }
        }
    }),

    // @desc Delete User
    // @route DELETE /api/users/delete
    // @access Private
    delete: expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id)

        if (user) {
            await User.findByIdAndRemove(req.user.id)
            res.status(200).json({ message: { code: 0, message: 'success' } })
        } else {
            res.status(400)
            throw new Error('User not found !!!')
        }
    }),
}

const generateToken = id => jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14d' })

export default user
