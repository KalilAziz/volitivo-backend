import { GetUserProfileServices } from '../get-user-profile'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export const makeGetUserProfileServices = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const profileUserServices = new GetUserProfileServices(prismaUsersRepository)

  return profileUserServices
}
