import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    console.log(process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`Mongoose Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}
export default connectDb
