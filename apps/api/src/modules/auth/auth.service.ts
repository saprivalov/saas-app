import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../db/prisma'
import { HttpError } from '../../common/http-error'
import { RegisterInput, LoginInput } from './auth.schemas'

const JWT_SECRET = process.env.JWT_SECRET!

export class AuthService {
  async register(input: RegisterInput) {
    const exists = await prisma.user.findUnique({ where: { email: input.email } })
    if (exists) throw new HttpError(409, 'Email already in use')

    const passwordHash = await bcrypt.hash(input.password, 10)
    const user = await prisma.user.create({
      data: { email: input.email, name: input.name, passwordHash },
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    })

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    return { accessToken, user }
  }

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: input.email } })
    if (!user) throw new HttpError(401, 'Invalid credentials')

    const valid = await bcrypt.compare(input.password, user.passwordHash)
    if (!valid) throw new HttpError(401, 'Invalid credentials')

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    const { passwordHash: _, ...safeUser } = user
    return { accessToken, user: safeUser }
  }
}
