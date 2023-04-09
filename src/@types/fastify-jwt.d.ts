import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      role: 'ADMIN' | 'USER'
      permissions: 'USER_EDITOR' | 'USER_VIEWER' | 'USER_DELETER'
    }
  }
}
