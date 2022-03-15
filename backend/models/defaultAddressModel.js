import mongoose from 'mongoose'

const defaulAddressSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    country: { type: String, required: true, default: 'Uzbekistan' },
    city: { type: String, required: true },
    district: { type: String, required: true },
    zipcode: { type: Number, required: true },
})

const DefaulAddress = mongoose.model('DefaulAddress', defaulAddressSchema)

export default DefaulAddress
