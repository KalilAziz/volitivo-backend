import { FastifyInstance } from 'fastify'

import { register } from '@/http/controller/users/register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middleware/verify-jwt'
import { refresh } from './refresh'

export default async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.post('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
