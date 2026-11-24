import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods:["POST","PUT","GET","DELETE"]
}))

app.listen(3000,() => {
    console.log("Server is running")
})