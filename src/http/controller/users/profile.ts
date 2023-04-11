import { env } from '@/env'
import { makeGetUserProfileServices } from '@/services/factories/make-get-user-profile-services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'
export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const getUserProfile = makeGetUserProfileServices()

  const authToken = request.headers.authorization as string

  const [, token] = authToken.split(' ')

  const { sub } = verify(token, env.JWT_SECRET)

  const {
    user: { email, permissions, roles },
  } = await getUserProfile.execute({
    userId: sub as string,
  })

  reply.status(200).send({
    message: 'User profile successfully',
    email,
    roles,
    permissions,
  })
}
