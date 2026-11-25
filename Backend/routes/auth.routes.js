import express from 'express'
import { loginAccount, registerAccount } from '../controllers/auth.controller.js'

const authRouter = express.Router()
authRouter.post("/register",registerAccount)
authRouter.post("/login",loginAccount)
export default authRouter