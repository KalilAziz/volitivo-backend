import { InvalidCredentialsError } from '@/services/errors/invalidCredentials'
import { makeAuthenticateServices } from '@/services/factories/make-authenticate-services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { sign } from 'jsonwebtoken'
import { env } from '@/env'
import { GenerateRefreshToken } from '@/provider/generate-refresh-token'
import { GenerateToken } from '@/provider/generate-token'
export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = await authenticateBodySchema.parse(request.body)

  try {
    const autheticateServices = makeAuthenticateServices()

    const { user } = await autheticateServices.execute({
      email,
      password,
    })

    const generatetoken = new GenerateToken()
    const token = await generatetoken.execute(user)

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await (await generateRefreshToken.execute(user.id)).id

    reply.status(200).send({
      message: 'User authenticated successfully',
      token,
      refreshToken,
      roles: user.roles,
      permissions: user.permissions,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
