import mongoose from 'mongoose'

const addressSchema = mongoose.Schema(
    {
        user: { type: String, required: true },
        country: { type: String, required: true, default: 'Uzbekistan' },
        city: { type: String, required: true },
        district: { type: String, required: true },
        neighborhood: { type: String, required: true },
        zipcode: { type: Number, required: true },
        defaultAddress: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
)

export default mongoose.model('Address', addressSchema)
