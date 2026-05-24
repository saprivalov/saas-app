import { PrismaClient } from '@prisma/client'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'
import type { HTTPQueryOptions } from '@neondatabase/serverless'

const adapter = new PrismaNeonHTTP(
  process.env.DATABASE_URL!,
  {} as HTTPQueryOptions<boolean, boolean>,
)

export const prisma = new PrismaClient({ adapter })
