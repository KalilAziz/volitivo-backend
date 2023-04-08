// Import fastify
import fastify from 'fastify'
// importando zod para fazer a validação dos dados que estão sendo enviados para a rota
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// Criando instância do fastify
export const app = fastify()

// Importando rotas
// Rotas de maneira bem primitiva, sem utilização de controllers
app.post('/users', async (request, reply) => {
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

  // Salvando os dados no banco de dados usando o prisma

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  // Retornando uma resposta para o usuário
  reply.send({
    message: 'User created successfully',
    user,
  })
})
