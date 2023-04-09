import { FastifyInstance } from 'fastify'

import { register } from '@/http/controller/register'

export default async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
