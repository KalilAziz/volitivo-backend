// Depois que criamos o nosso controller, precisamos importá-lo em nosso arquivo routes, para que ele possa ser utilizado.

//
import { FastifyInstance } from 'fastify'

//Controller de registro
import { register } from '@/http/controller/register'

// Criamos esse arquivo para que possamos organizar melhor as nossas rotas. Ele serivirá como nosso plugin do fastify, que irá conter todas as nossas rotas

export default async function userRoutes(app: FastifyInstance) {
  // Criando rota de registro
  app.post('/users', register)
}
