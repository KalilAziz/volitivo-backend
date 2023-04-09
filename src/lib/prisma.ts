import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  // Quando rodar-mos o projeto em produção, não queremos ver os logs do Prisma Client.
  log: env.NODE_ENV === 'dev' ? ['query', 'info', 'warn'] : [],
})
