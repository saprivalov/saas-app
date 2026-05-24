import express from 'express'
import cors from 'cors'
import { authRouter } from './modules/auth/auth.routes'
import { errorHandler } from './middlewares/error-handler'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)

app.use(errorHandler)
