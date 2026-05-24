import { Router } from 'express'
import { validateBody } from '../../middlewares/validate'
import { loginSchema, registerSchema } from './auth.schemas'
import { login, register } from './auth.controller'

export const authRouter = Router()

authRouter.post('/register', validateBody(registerSchema), register)
authRouter.post('/login', validateBody(loginSchema), login)
