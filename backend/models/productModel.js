import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: false },
    },
    { timestamps: true }
)

const productSchema = mongoose.Schema(
    {
        image: { type: String, required: true },
        name: { type: String, required: true },
        reviews: [reviewSchema],
        rating: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        stock: { type: Number, required: false, default: 0 },
        category: { type: String, required: true },
        description: { type: String, required: true },
        warranty: { type: String, required: true },
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
