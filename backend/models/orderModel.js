import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        shipping_address: {
            email: { type: String, required: true },
            fullname: { type: String, required: true },
            address: {
                country: { type: String, required: true, default: 'Uzbekistan' },
                city: { type: String, required: true },
                district: { type: String, required: true },
                zipcode: { type: Number, required: true },
            },
            phone: { type: String, required: true },
        },
        delivery_method: { type: String, required: true },
        payment_method: { type: String, required: true },
        order_summary: {
            image: { type: String, required: true },
            name: { type: String, required: true },
            cpu: { type: String, required: true },
            motherboard: { type: String, required: true },
            cooler: { type: String, required: true },
            ozu: { type: String, required: true },
            videocard: { type: String, required: false },
            hdd: { type: String, required: false },
            ssd_sata: { type: String, required: false },
            ssd_m2: { type: String, required: false },
            price: { type: Number, required: true, default: 0 },
            keyboard: { type: String, required: false },
            mouse: { type: String, required: false },
            mat: { type: String, required: false },
            qty: { type: Number, required: true, default: 1 },
        },
        subtotal: { type: String, required: true },
        delivery: { type: String, required: true },
        total: { type: String, required: true },
        status: { type: Number, required: true, default: 1 }, // code 1 => qabul qilindi
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Order', orderSchema)
