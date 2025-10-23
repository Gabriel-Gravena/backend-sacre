import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

const app = fastify({
  logger: true, 
})

app.register(fastifyCors, { origin: '*' })


app.listen({ port: 3333 })
  .then(() => {
    console.log('servidor rodando em http://localhost:3333')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
