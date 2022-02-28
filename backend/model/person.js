import mongoose from 'mongoose'
const personModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    company: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const person = mongoose.model('Person', personModel)

export default person
