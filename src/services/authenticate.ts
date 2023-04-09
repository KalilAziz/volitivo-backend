import { UsersRepositoryInterface } from '@/repositories/users-repository-interface'
import { InvalidCredentialsError } from './errors/invalidCredentials'
import { compare } from 'bcryptjs'
import { User } from '@/@types/User'
type ResquestProps = {
  email: string
  password: string
}

type ResponseProps = {
  user: User
}

export class AuthenticateUserServices {
  constructor(private userRepository: UsersRepositoryInterface) {}

  async execute({ email, password }: ResquestProps): Promise<ResponseProps> {
    const user = await this.userRepository.findUserByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
