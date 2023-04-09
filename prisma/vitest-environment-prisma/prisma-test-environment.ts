import { prisma } from '@/lib/prisma'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const generateDatabaseUrlschema = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    // Antes de cada test
    console.log('setup')

    // Iremos gerar um nome aleatório para o schema
    const schema = randomUUID()
    const databaseURL = generateDatabaseUrlschema(schema)

    // Iremos sobreescrever a URL de conexão do Prisma
    process.env.DATABASE_URL = databaseURL

    // Iremos importar as migrations ao banco de dados
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        // Depois de cada test
        // console.log('teardown')

        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE;`
        )

        // Desconectamos do banco de dados
        await prisma.$disconnect()
      },
    }
  },
}
