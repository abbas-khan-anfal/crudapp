import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/MongoDB.js'
import userRouter from './routes/User.js'
import dataRouter from './routes/Data.js'


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ['PUT', 'GET', 'DELETE', 'POST'],
    credentials : true
}))

// endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user', userRouter)

app.use('/api/data', dataRouter)

// server listening
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})