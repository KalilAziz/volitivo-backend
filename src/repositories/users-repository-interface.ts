// iremos criar uma inversão de dependência, onde iremos passar a instância do nosso repositório para o nosso service, e não mais o prisma
// Para começar, iremos primeiramente criar uma interface para o nosso repositório, para que possamos definir os métodos que iremos utilizar
// É importante criar essa interface, pois assim, caso algum dia decidamos trocar o banco de dados, não precisaremos mexer no nosso service, apenas no nosso repositório

// Importar Prisma para que possamos pegar o tipo do User
import { Prisma, User } from '@prisma/client'

export interface UsersRepositoryInterface {
  findUserByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
