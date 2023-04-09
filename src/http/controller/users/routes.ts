import { FastifyInstance } from 'fastify'

import { registerUser } from '@/http/controller/users/registerUser'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middleware/verify-jwt'

export default async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)

  app.get(
    '/me',
    {
      onRequest: [verifyJwt],
    },
    profile
  )
}
