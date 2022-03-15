import mongoose from 'mongoose'

const pcSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: Array, required: true },
        cpu: { type: String, required: true },
        motherboard: { type: String, required: true },
        cooler: { type: String, required: true },
        ddr: { type: String, required: true },
        videocard: { type: String, required: true },
        hdd: { type: String, required: false },
        ssd_sata: { type: String, required: false },
        ssd_m2: { type: String, required: false },
        price: { type: Number, required: true, default: 0 },
        stock_price: { type: Number, required: false, default: 0 },
        rating: { type: Number, required: true, default: 0 },
        category: { type: String, required: true },
        description: { type: String, required: true },
        warranty: { type: String, required: true },
        have: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
)

const Pc = mongoose.model('Pc', pcSchema)

export default Pc
