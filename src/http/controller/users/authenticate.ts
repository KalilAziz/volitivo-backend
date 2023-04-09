import { InvalidCredentialsError } from '@/services/errors/invalidCredentials'
import { makeAuthenticateServices } from '@/services/factories/make-authenticate-services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    )

    reply.status(200).send({
      message: 'User authenticated successfully',
      token,
      user: {
        ...user,
        password_hash: undefined,
      },
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
