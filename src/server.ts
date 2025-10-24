import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { authRoutes } from './routes/AuthRoutes'
import cookie from './plugins/cookie'
import jwt from './plugins/jwt'

const app = fastify({
  logger: true, 
})

app.register(fastifyCors, { 
  origin: '*',
  credentials: true
})

app.register(cookie)
app.register(jwt)

app.register(authRoutes)


app.listen({ port: 3333 })
  .then(() => {
    console.log('servidor rodando em http://localhost:3333')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
