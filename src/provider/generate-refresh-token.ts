import { prisma } from '@/lib/prisma'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class GenerateRefreshToken {
  async execute(userId: string) {
    const expires_in = dayjs().add(1, 'M').unix()

    const alreadyExists = await prisma.refreshToken.findFirst({
      where: {
        user_id: userId,
      },
    })

    if (alreadyExists) {
      const generateRefreshToken = await prisma.refreshToken.update({
        where: {
          id: alreadyExists.id,
        },
        data: {
          id: randomUUID(),
          expires_in,
        },
      })

      return generateRefreshToken
    } else {
      const generateRefreshToken = await prisma.refreshToken.create({
        data: {
          user_id: userId,
          expires_in,
        },
      })
      return generateRefreshToken
    }
  }
}
