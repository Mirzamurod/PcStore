import mongoose from 'mongoose'

const pcSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: Array, required: true },
        cpu: { type: String, required: true }, // protsessor
        motherboard: { type: String, required: true },
        cooler: { type: String, required: true },
        ddr: { type: String, required: true }, // ozu
        videocard: { type: String, required: true },
        hdd: { type: String, required: false },
        ssd_sata: { type: String, required: false },
        ssd_m2: { type: String, required: false },
        price: { type: Number, required: true, default: 0 },
        stock_price: { type: Number, required: false, default: 0 },
        rating: { type: Number, required: true, default: 0 },
        category: { type: String, required: true },
        description: { type: String, required: true },
        warranty: { type: Number, required: true },
        have: { type: Boolean, required: true, default: false }, // bor yoligi
    },
    { timestamps: true }
)

export default mongoose.model('Pc', pcSchema)
