import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../common/http-error'
import { ZodError } from 'zod'

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message })
    return
  }
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Validation error', details: err.errors })
    return
  }
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
}
