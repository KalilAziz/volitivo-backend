import { FastifyRequest, FastifyReply } from 'fastify'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify({
    onlyCookie: true,
  })

  const token = await reply.jwtSign(
    {
      role: request.user.role,
      permissions: request.user.permissions,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    }
  )

  const refreshToken = await reply.jwtSign(
    {
      role: request.user.role,
      permissions: request.user.permissions,
    },
    {
      sign: {
        sub: request.user.sub,
        // Tempo de expiração do token
        expiresIn: '7d',
      },
    }
  )

  reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({
      message: 'User authenticated successfully',
      token,
    })
}
