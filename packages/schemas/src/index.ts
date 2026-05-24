import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const RegisterBodySchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8),
})

export const LoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  user: UserSchema,
})

export type User = z.infer<typeof UserSchema>
export type RegisterBody = z.infer<typeof RegisterBodySchema>
export type LoginBody = z.infer<typeof LoginBodySchema>
export type AuthResponse = z.infer<typeof AuthResponseSchema>
