import { Router } from 'express'
import { requireAdmin, authCheck } from '@middleware/auth.middleware'
import { loginUser, registerUser } from 'controllers/auth.controller'

export const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
