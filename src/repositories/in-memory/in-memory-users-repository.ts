import { User, Prisma } from '@prisma/client'
import { UsersRepositoryInterface } from '../users-repository-interface'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public users: User[] = []

  async findUserByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: (data.role as User['role']) ?? ['USER'],
      permissions: (data.permissions as User['permissions']) ?? [],
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
