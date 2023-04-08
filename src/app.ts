// Import fastify
import fastify from 'fastify'
import userRoutes from './http/controller/routes'
import { ZodError } from 'zod'
import { env } from './env'

// Criando instância do fastify
export const app = fastify()

// Importando o arquivo de rotas
app.register(userRoutes)

// Aqui, iremos criar um middleware para que possamos tratar os erros que ocorrerem no controller

app.setErrorHandler((error, request, reply) => {
  // Caso ocorra algum erro de validação
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation failed',
      issues: error.format(),
    })
  }

  // Caso ocorra algum outro tipo de erro e não estejamos em ambiente de produção, iremos retornar o erro no console
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Caso estejamos em ambiente de produção, podemos usar alguma ferramenta para monitorar os erros, como o Sentry
  }

  // Caso não seja o tipo de erro que realmente sabemos, retornaremos um erro interno

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
