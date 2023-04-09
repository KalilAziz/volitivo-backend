import { makeGetUserProfileServices } from '@/services/factories/make-get-user-profile-services'
import { FastifyReply, FastifyRequest } from 'fastify'

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const getUserProfile = makeGetUserProfileServices()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
    message: 'User profile successfully',
  })
}
