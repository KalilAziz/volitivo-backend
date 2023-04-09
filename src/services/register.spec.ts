import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUserServices } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import bcrypt from 'bcryptjs'
import { ZodError } from 'zod'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUserServices

describe('register services', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserServices(inMemoryUsersRepository)
  })

  it('should be able to register a service', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'exemple@hotmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'exemple@hotmail.com',
        password_hash: expect.any(String),
        role: ['USER'],
        permissions: [],
      })
    )
    expect(user.name).toEqual('John Doe')
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johnDoe@hotmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a service with an existing email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'exemple@hotmail.com',
      password: '123456',
    })

    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'exemple@hotmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register a service with password less than 6 characters', async () => {
    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'exemple@hotmail.com',
        password: '12345',
      })
    ).rejects
  })
})
