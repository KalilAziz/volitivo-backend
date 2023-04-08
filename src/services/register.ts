// Vamos fazer uma mudança importante em nossa aplicação, outra desestruturação, iremos desacoplar o código de criação do usuário em outro lugar, que será nosso service. Isso é importante, por que caso a gente tenha que criar o usuário em outro lugar, iríamos repetir o código, e colocando ele em um service, fica extremamente simples, pois podemos apenas importar o service e utilizar ele em qualquer lugar que precisarmos. Outra vantagem é deixar nosso controller mais simples e limpo, pois ele ficará responsável apenas por receber as requisições e devolver as respostas, executando apenas sua função original.

// Importando o prisma client
import { prisma } from '@/lib/prisma'
// Iremos agora começar a fazer o hash de senha do usuário. Para isso, iremos utilizar o bcryptjs
import bcrypt from 'bcryptjs'

// Iremos criar uma função que irá receber o nome, email e senha do usuário, e irá retornar o usuário criado

type RegisterUserServicesParams = {
  name: string
  email: string
  password: string
}

export const registerUserServices = async ({
  name,
  email,
  password,
}: RegisterUserServicesParams) => {
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
    // Se o usuário já existir, iremos retornar uma resposta para o usuário. Para isso, iremos utilizar o método status() do fastify, passando o código 409, que é o código de erro para quando o usuário já existe. E iremos retornar uma mensagem de erro
    // return reply.status(409).send({
    //   message: 'User already exists',
    // })

    // Não temos mais o reply, então vamos apenas retornar um erro e tratar ele em nosso controller
    throw new Error('User already exists')
  }

  // Caso o usuário não exista, iremos criar um novo usuário no banco de dados

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  // Agora, iremos retornar o usuário criado, Iremos retornar dentro de um objeto, pois assim, podemos retornar mais de uma coisa, caso seja necessário.
  return {
    user,
  }
}
