import { prisma } from '@/lib/prisma'
import { GenerateRefreshToken } from '@/provider/generate-refresh-token'
import { GenerateToken } from '@/provider/generate-token'
import { FastifyRequest, FastifyReply } from 'fastify'
import dayjs from 'dayjs'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  const { refreshToken } = request.body as { refreshToken: string }

  const existRefreshToken = await prisma.refreshToken.findUnique({
    where: {
      id: refreshToken,
    },
    include: {
      user: true,
    },
  })

  if (!existRefreshToken) {
    return reply.status(401).send({
      message: 'Refresh token not found',
    })
  }

  const { user } = existRefreshToken

  const generatetoken = new GenerateToken()
  const newToken = await generatetoken.execute(user)

  const refreshTokenExpired = dayjs().isAfter(
    dayjs.unix(existRefreshToken.expires_in)
  )

  let newRefreshToken = refreshToken

  if (refreshTokenExpired) {
    const generateRefreshToken = new GenerateRefreshToken()
    const newtoken = await generateRefreshToken.execute(user.id)

    newRefreshToken = newtoken.id
  }

  reply.status(200).send({
    message: 'User authenticated successfully',
    token: newToken,
    refreshToken: newRefreshToken,
  })
}
