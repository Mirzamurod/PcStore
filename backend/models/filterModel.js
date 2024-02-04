import mongoose from 'mongoose'

const filterSchema = mongoose.Schema(
  {
    filter_name: { type: String, required: true },
    filter_sort_key: { type: String, required: false },
    sort: [{ name: { type: String, required: false } }],
    minmax: { type: Boolean, required: false },
    column: { type: String, required: false },
    checkbox: [{ name: { type: String, required: false } }],
    select: [
      {
        name: { type: String, required: false },
        key: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Filter', filterSchema)
