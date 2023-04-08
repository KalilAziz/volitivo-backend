// Iremos agora usar um design pattern, onde iremos fazer mais uma desacoplagem de código. Pois iremos separar nosso código do prisma do nosso núcleo, pois se algum dia decidirmos substituir nosso banco de dados ou ORM, não precisaremos mexer no nosso núcleo, apenas no nosso repositório.

// Importar instância do prisma
import { prisma } from '@/lib/prisma'
// importar Prisma para que possamos pegar o tipo do User
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  // Teremos vários métodos relacionado ao usuário, mas por enquanto iremos colocar o método de criação de usuário, mas teremos alguns outros, como: buscar usuários, buscar usuário, atualizar usuário, deletar usuário, etc.

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
