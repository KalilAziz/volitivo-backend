import { z } from 'zod'

import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUserServices } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = await registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUserServices = new RegisterUserServices(prismaUsersRepository)

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
