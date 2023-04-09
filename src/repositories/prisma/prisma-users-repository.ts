import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepositoryInterface } from '../users-repository-interface'

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
