import { Prisma, User } from '@prisma/client'

export interface UsersRepositoryInterface {
  create(data: Prisma.UserCreateInput): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findUserById(userId: string): Promise<User | null>
}
