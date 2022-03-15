import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import pcRoutes from './routes/pcRoutes.js'

const app = express()
dotenv.config()
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/users', userRoutes)
app.use('/api/pcs', pcRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server ishga tushdi. Port ${port}`.yellow.bold)
})
