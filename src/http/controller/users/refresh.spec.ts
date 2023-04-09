// path: src/http/controller/users/authenticate.spec.ts

import Request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await Request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoe@exemple.com',
      password: '123456',
    })

    const authResponse = await Request(app.server).post('/sessions').send({
      email: 'johnDoe@exemple.com',
      password: '123456',
    })

    const cookie = authResponse.get('set-cookie')

    const response = await Request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookie)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toEqual({
      message: 'User authenticated successfully',
      token: expect.any(String),
    })
    expect(response.get('set-cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
