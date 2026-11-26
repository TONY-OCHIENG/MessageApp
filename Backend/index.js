import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import actionRoutes from './routes/action.routes.js'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods:["POST","PUT","GET","DELETE"]
}))
app.use("/api/v1",authRouter)
app.use("/api/v1",actionRoutes)

app.listen(process.env.PORT,() => {
    console.log("Server is running")
})