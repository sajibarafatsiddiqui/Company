import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/connectDb.js'
import colors from 'colors'
import companyRoutes from './routes/companyRoutes.js'
import personRoutes from './routes/personRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
connectDb()
const app = express()
app.use(express.json())
app.use('/api/companies', companyRoutes)
app.use('/api/persons', personRoutes)

app.use((req, res, next) => {
  const err = new Error(`Not found -${req.originalUrl}`)
  res.status(404)
  next(err)
})
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5005
app.listen(port, console.log('server is running'.bgBlue))
