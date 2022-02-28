import mongoose from 'mongoose'

const companyModel = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

const company = mongoose.model('Company', companyModel)

export default company
