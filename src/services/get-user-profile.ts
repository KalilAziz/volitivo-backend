import { User } from '@/@types/User'
import { UsersRepositoryInterface } from '@/repositories/users-repository-interface'
import { InvalidCredentialsError } from './errors/invalidCredentials'

type ResquestProps = {
  userId: string
}

type ResponseProps = {
  user: User
}

export class GetUserProfileServices {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ userId }: ResquestProps): Promise<ResponseProps> {
    const user = await this.usersRepository.findUserById(userId)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
