import express from 'express'
import { authenticateUser, loginAccount, registerAccount } from '../controllers/auth.controller.js'
import { accessToken } from '../middlewares/token.js'

const authRouter = express.Router()
authRouter.post("/register",registerAccount)
authRouter.post("/login",loginAccount)
authRouter.get("/authenticate",accessToken, authenticateUser)
export default authRouter