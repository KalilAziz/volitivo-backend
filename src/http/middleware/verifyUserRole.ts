// path: src/http/middlewares/verify-user-role.ts

import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'USER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // const { roles } = await request.user

    // if (roles !== roleToVerify) {
    //   return reply
    //     .status(401)
    //     .send({ message: 'Unauthorized', code: 'token.expired' })
    // }

    return reply
  }
}
