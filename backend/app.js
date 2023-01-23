import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { userRoutes, pcRoutes, addressRoutes, reviewRoutes, filters } from './routes/index.js'

const app = express()
dotenv.config()
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => res.send('Hello World'))

app.use('/api/users', userRoutes)
app.use('/api/pcs', pcRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/filters', filters)
app.use('/*', (req, res) => res.status(404).json({ data: 'Url not Found', code: 1 }))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server ishga tushdi. Port ${port}`.yellow.bold))

export default app
