import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.status).toEqual(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: user.email,
      })
    )
  })

  it('should not be able to get user profile without token', async () => {
    const profileResponse = await request(app.server).get('/me').send()

    expect(profileResponse.status).toEqual(401)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        code: 'token.invalid',
        message: 'Token not present.',
      })
    )
  })
})
