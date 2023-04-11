import { User } from '@/@types/User'
import { env } from '@/env'
import { sign } from 'jsonwebtoken'

export class GenerateToken {
  async execute(user: User) {
    const token = await sign(
      {
        roles: user.roles,
        permissions: user.permissions,
      },
      env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '2h',
      }
    )

    return token
  }
}
