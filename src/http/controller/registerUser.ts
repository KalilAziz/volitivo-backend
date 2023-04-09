import { z } from 'zod'

import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterUserServices } from '@/services/factories/make-register-user-services'

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = await registerBodySchema.parse(request.body)

  try {
    const registerUserServices = makeRegisterUserServices()

    await registerUserServices.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: 'User already exists',
      })
    }

    throw error
  }

  reply.status(201).send({
    message: 'User created successfully',
  })
}
