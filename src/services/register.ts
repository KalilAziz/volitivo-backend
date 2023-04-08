// Vamos fazer uma mudança importante em nossa aplicação, outra desestruturação, iremos desacoplar o código de criação do usuário em outro lugar, que será nosso service. Isso é importante, por que caso a gente tenha que criar o usuário em outro lugar, iríamos repetir o código, e colocando ele em um service, fica extremamente simples, pois podemos apenas importar o service e utilizar ele em qualquer lugar que precisarmos. Outra vantagem é deixar nosso controller mais simples e limpo, pois ele ficará responsável apenas por receber as requisições e devolver as respostas, executando apenas sua função original.

import { UsersRepositoryInterface } from '@/repositories/users-repository-interface'
// Iremos agora começar a fazer o hash de senha do usuário. Para isso, iremos utilizar o bcryptjs
import bcrypt from 'bcryptjs'

// Iremos criar uma função que irá receber o nome, email e senha do usuário, e irá retornar o usuário criado

type RegisterUserServicesParams = {
  name: string
  email: string
  password: string
}

// Agora iremos criar uma class e colocar por volta do nosso registerUserServices, para que possamos criar uma instância do nosso service, e assim, poderemos utilizar ele em qualquer lugar que precisarmos

export class RegisterUserServices {
  constructor(private UsersRepository: UsersRepositoryInterface) {}

  async execute({ name, email, password }: RegisterUserServicesParams) {
    // Iremos agora fazer o hash da senha do usuário, para que ela não fique salva no banco de dados em texto puro
    const password_hash = await bcrypt.hash(password, 6)

    // Iremos agora verificar se o usuário já existe, para que não tenhamos usuários duplicados
    const userAlreadyExists = await this.UsersRepository.findUserByEmail(email)

    // Caso o usuário já exista, iremos lançar um erro
    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    // Caso o usuário não exista, iremos criar o usuário
    const user = await this.UsersRepository.create({
      name,
      email,
      password_hash,
    })

    // Iremos agora retornar o usuário criado
    return {
      user,
    }
  }
}
