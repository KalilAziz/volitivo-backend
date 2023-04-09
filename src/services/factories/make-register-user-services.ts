import { RegisterUserServices } from '../register-user'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export const makeRegisterUserServices = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserServices = new RegisterUserServices(prismaUsersRepository)

  return registerUserServices
}
