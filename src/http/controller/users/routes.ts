import { FastifyInstance } from 'fastify'

import { register } from '@/http/controller/users/register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middleware/verify-jwt'

export default async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get(
    '/me',
    {
      onRequest: [verifyJwt],
    },
    profile
  )
}
