import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { it, describe, beforeEach, expect } from 'vitest'
import { GetUserProfileServices } from './get-user-profile'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentials'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileServices

describe('Profile Services', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileServices(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'exemple@hotmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user: userAuthenticate } = await sut.execute({
      userId: user.id,
    })

    expect(userAuthenticate).toHaveProperty('id')
    expect(userAuthenticate.id).toEqual(expect.any(String))
    expect(userAuthenticate).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'exemple@hotmail.com',
      })
    )
  })

  it('should not be able to show a profile with a non existing user', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-user',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
