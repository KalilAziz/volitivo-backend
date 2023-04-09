import { describe, it, beforeEach, expect } from 'vitest'
import { AuthenticateUserServices } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentials'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUserServices

describe('authenticate services', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserServices(inMemoryUsersRepository)
  })

  it('should be able to authenticate a service', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'exemple@hotmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'exemple@hotmail.com',
      password: '123456',
    })

    expect(user).toEqual(
      expect.objectContaining({
        email: 'exemple@hotmail.com',
      })
    )
  })

  it('should not be able to authenticate a service with a non existing user', async () => {
    await expect(
      sut.execute({
        email: 'exemple@hotmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate a service with email incorrect', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'exemple@hotmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email: 'exemple1@hotmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate a service with password incorrect', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'exemple@hotmail.com',
      password_hash: await hash('1234567', 6),
    })

    await expect(
      sut.execute({
        email: 'exemple@hotmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
