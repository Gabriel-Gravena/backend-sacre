import fp from 'fastify-plugin'
import fastifyCookie from '@fastify/cookie'
import { FastifyInstance } from 'fastify'

async function cookiePlugin(fastify: FastifyInstance) {
  fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    parseOptions: {}
  })
}

export default fp(cookiePlugin, {
  name: 'cookie-plugin'
})