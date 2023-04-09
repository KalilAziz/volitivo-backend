import { AuthenticateUserServices } from '../authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export const makeAuthenticateServices = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUserServices = new AuthenticateUserServices(
    prismaUsersRepository
  )

  return authenticateUserServices
}
