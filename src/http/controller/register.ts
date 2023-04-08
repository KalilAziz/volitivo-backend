// Iremos colocar todas as nossas funcionalidades de registro aqui, retirando todo o código que está no arquivo src\app.ts

// importando zod para fazer a validação dos dados que estão sendo enviados para a rota
import { z } from 'zod'

// importando a tipagem do fastify
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUserServices } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'

// Os controlers são responsáveis por receber as requisições e devolver as respostas. em vez de deixar toda a parte de criação de usuário no arquivo src/app.ts, deixando mais "limpo"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Essa rota será responsável por criar um usuário, mas temos que fazer uma validação dos valores que estão sendo enviados para a rota. Para isso, iremos utilizar o zod
  const registerBodySchema = z.object({
    name: z.string(),
    // Para o email, iremos utilizar o método email() do zod, que irá verificar se o valor que está sendo enviado é um email válido
    email: z.string().email(),
    // Para a senha, iremos utilizar o método min() do zod, que irá verificar se o valor que está sendo enviado tem no mínimo 6 caracteres
    password: z.string().min(6),
  })

  // Desestruturação dos dados que estão sendo enviados para a rota (já passando pelaverificação do zod)
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
    // Caso ocorra algum erro, iremos retornar uma resposta para o usuário
    // return reply.status(409).send({
    //   message: 'User already exists',
    // })

    // Iremos agora verificar se o erro é do tipo UserAlreadyExistsError, para que possamos retornar uma resposta para o usuário
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: 'User already exists',
      })
    }

    // Caso o erro não seja do tipo UserAlreadyExistsError, iremos retornar uma resposta para o usuário
    return reply.status(500).send({
      message: 'Internal server error',
    })
  }

  // Retornando uma resposta para o usuário
  reply.status(201).send({
    message: 'User created successfully',
    // Não conseguimos retornar o usuário, pois nosso service está dentro de um try/catch.
    // user,
  })
}
