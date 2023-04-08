// Iremos colocar todas as nossas funcionalidades de registro aqui, retirando todo o código que está no arquivo src\app.ts

// importando zod para fazer a validação dos dados que estão sendo enviados para a rota
import { z } from 'zod'
// Importando o prisma client
import { prisma } from '@/lib/prisma'
// importando a tipagem do fastify
import { FastifyReply, FastifyRequest } from 'fastify'
// Iremos agora começar a fazer o hash de senha do usuário. Para isso, iremos utilizar o bcryptjs
import bcrypt from 'bcryptjs'

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

  // Para que possamos ferar um hash para a senah do usuário, temos que usar a função hash de bcrypt, passndo odis parâmetros, primeiro a senha do usuário, e o segundo é o número de rounds que queremos usar para gerar nosso hash. O número de rounds é o número de vezes que o algoritmo irá rodar para gerar o hash. Quanto mais rounds, mais seguro será o hash, mas mais tempo irá demorar para gerar o hash. Para esse projeto, iremos utilizar 6 rounds

  const password_hash = await bcrypt.hash(password, 6)

  // Agora, antes de finalizar, iremos fazer uma pesquisa no banco de dados para ver se o usuário já está cadastrado, para isso, temos que verificar se o email que está sendo enviado já existe no banco de dados. Para isso, iremos utilizar o método findUnique do prisma, passando o email como parâmetro

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  // Iremos colocar um if para desviar o fluxo do código caso o usuário já exista no banco de dados
  if (userAlreadyExists) {
    // Se o usuário já existir, iremos retornar uma resposta para o usuário
    return reply.status(409).send({
      message: 'User already exists',
    })
  }

  // Caso o usuário não exista, iremos criar um novo usuário no banco de dados

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  // Retornando uma resposta para o usuário
  reply.send({
    message: 'User created successfully',
    user,
  })
}
