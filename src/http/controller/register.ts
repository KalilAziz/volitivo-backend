// Iremos colocar todas as nossas funcionalidades de registro aqui, retirando todo o código que está no arquivo src\app.ts

// importando zod para fazer a validação dos dados que estão sendo enviados para a rota
import { z } from 'zod'

// importando a tipagem do fastify
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerUserServices } from '@/services/register'

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
    // Agora iremos usar o service que criamos para criar o usuário
    await registerUserServices({
      name,
      email,
      password,
    })
  } catch (error) {
    // Caso o usuário já exista, iremos retornar uma resposta para o usuário. Para isso, iremos utilizar o método status() do fastify, passando o código 409, que é o código de erro para quando o usuário já existe. E iremos retornar uma mensagem de erro
    return reply.status(409).send({
      message: 'User already exists',
    })
  }

  // Retornando uma resposta para o usuário
  reply.send({
    message: 'User created successfully',
    // Não conseguimos retornar o usuário, pois nosso service está dentro de um try/catch.
    // user,
  })
}
