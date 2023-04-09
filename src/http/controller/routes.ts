import { FastifyInstance } from 'fastify'

import { registerUser } from '@/http/controller/registerUser'
import { authenticate } from './authenticate'

export default async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)
}
