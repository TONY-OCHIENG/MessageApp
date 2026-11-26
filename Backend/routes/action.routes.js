import express from 'express'
import { getusers } from '../controllers/actions.controller.js'

const actionRoutes = express.Router()
actionRoutes.get("/users/:id",getusers)
export default actionRoutes