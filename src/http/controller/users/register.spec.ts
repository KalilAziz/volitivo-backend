// path: src/http/controller/users/register.spec.ts

import Request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await Request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoe@exemple.com',
      password: '123456',
    })

    expect(response.status).toEqual(201)
  })

  it('should not be able to register with email already registered', async () => {
    await Request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoe@exemple.com',
      password: '123456',
    })

    const response = await Request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoe@exemple.com',
      password: '123456',
    })

    expect(response.status).toEqual(409)
  })

  it('should not be able to register with invalid email', async () => {
    const response = await Request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoeexemple.com',
      password: '123456',
    })

    expect(response.status).toEqual(400)
  })
})
