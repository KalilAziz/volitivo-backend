import fastify from 'fastify'
import userRoutes from './http/controller/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(userRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation failed',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Caso estejamos em ambiente de produção, podemos usar alguma ferramenta para monitorar os erros, como o Sentry
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
