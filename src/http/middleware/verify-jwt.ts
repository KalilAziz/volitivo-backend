import { env } from '@/env'
import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'

export const verifyJwt = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return reply.status(401).send({
      code: 'token.invalid',
      message: 'Token not present.',
    })
  }

  const [, token] = authToken.split(' ')

  if (!token || token === 'null' || token === 'undefined') {
    return reply.status(401).send({
      code: 'token.invalid',
      message: 'Token not present.',
    })
  }

  try {
    const verifyToken = verify(token, env.JWT_SECRET)

    if (!verifyToken) {
      return reply.status(401).send({
        code: 'token.invalid',
        message: 'jwt malformed.',
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message)

    if (error.message === 'jwt malformed') {
      return reply.status(401).send({
        message: 'Unauthorized',
        code: 'token.malformed',
      })
    }

    if (error.message === 'jwt expired') {
      return reply.status(401).send({
        message: 'Unauthorized',
        code: 'token.expired',
      })
    }

    return reply.status(401).send({
      message: 'Unauthorized',
      code: 'token.invalid',
    })
  }
}
