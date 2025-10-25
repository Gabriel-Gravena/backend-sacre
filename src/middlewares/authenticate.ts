import { FastifyReply, FastifyRequest } from "fastify"


export async function authenticateMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ detail: 'Token não fornecido' })
    }

    const decoded = request.server.jwt.verify<{
      sub: string
      email?: string
      iat: number
      exp: number
    }>(token)

    request.user = decoded;

  } catch (error) {
    return reply.status(401).send({ detail: 'Token inválido ou expirado' })
  }
}