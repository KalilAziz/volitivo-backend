import { UsersRepositoryInterface } from '@/repositories/users-repository-interface'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

type RegisterUserServicesParams = {
  name: string
  email: string
  password: string
}

export class RegisterUserServices {
  constructor(private UsersRepository: UsersRepositoryInterface) {}

  async execute({ name, email, password }: RegisterUserServicesParams) {
    const password_hash = await bcrypt.hash(password, 6)

    const userAlreadyExists = await this.UsersRepository.findUserByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.UsersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
