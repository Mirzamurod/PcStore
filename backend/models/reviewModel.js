import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        pcId: { type: String, required: true },
    },
    { timestamps: true }
)

export default mongoose.model('Review', reviewSchema)
