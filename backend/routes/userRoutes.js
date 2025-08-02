import express from 'express'
import { checkAuth, login, signup } from '../controller/userControllers.js'
import protect from '../middleware/auth.js'

const userRouter = express.Router()


userRouter.post("/login",login)
userRouter.post("/signup",signup)
userRouter.get("/check",protect,checkAuth)

export default userRouter
