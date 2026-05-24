import { Request, Response } from 'express'
import { AuthService } from './auth.service'

const service = new AuthService()

export async function register(req: Request, res: Response): Promise<void> {
  const result = await service.register(req.body)
  res.status(201).json({ data: result })
}

export async function login(req: Request, res: Response): Promise<void> {
  const result = await service.login(req.body)
  res.json({ data: result })
}
