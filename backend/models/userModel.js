import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        dark_mode: { type: Boolean, required: true, default: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
)

export default mongoose.model('User', userSchema)
