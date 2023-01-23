import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            // console.log(error)
            res.status(401).json({ success: false, message: 'Not authorized' })
        }
    }

    if (!token) res.status(401).json({ success: false, message: 'Not authorized, no token' })
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) next()
    else res.status(401).json({ success: false, message: 'Not authorized as an admin' })
}

export { protect, admin }
