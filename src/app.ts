// Import fastify
import fastify from 'fastify'
import userRoutes from './http/controller/routes'

// Criando instância do fastify
export const app = fastify()

// Importando o arquivo de rotas
app.register(userRoutes)
