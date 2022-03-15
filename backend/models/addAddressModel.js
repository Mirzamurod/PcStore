import mongoose from 'mongoose'

const addAddressSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    country: { type: String, required: true, default: 'Uzbekistan' },
    city: { type: String, required: true },
    district: { type: String, required: true },
    zipcode: { type: Number, required: true },
})

const AddAddress = mongoose.model('AddAddress', addAddressSchema)

export default AddAddress
