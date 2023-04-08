// Arquivo de conexão com o banco de dados, utilizando o Prisma
// Importando variáveis de ambiente
import { env } from '@/env'

// Importando o Prisma Client
import { PrismaClient } from '@prisma/client'

// Criando e exportando uma instância do Prisma Client
export const prisma = new PrismaClient({
  // Queremos ver os logs do Prisma Client, mas iremos criar um condicional para que isso só aconteça em ambiente de desenvolvimento. Quando rodar-mos o projeto em produção, não queremos ver os logs do Prisma Client.
  log: env.NODE_ENV === 'dev' ? ['query', 'info', 'warn'] : [],
})
