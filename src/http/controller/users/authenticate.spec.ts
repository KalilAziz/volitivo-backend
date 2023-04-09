// path: src/http/controller/users/authenticate.spec.ts

import Request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await Request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoe@exemple.com',
      password: '123456',
    })

    const response = await Request(app.server).post('/sessions').send({
      email: 'johnDoe@exemple.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toEqual({
      message: 'User authenticated successfully',
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    const response = await Request(app.server).post('/sessions').send({
      email: 'testinvalid@exemple.com',
      password: '123456',
    })

    expect(response.status).toEqual(400)
  })
})
