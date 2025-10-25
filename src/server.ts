import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { authRoutes } from './routes/AuthRoutes'
import { calculationRoutes } from './routes/CalculationRoutes'
import cookie from './plugins/cookie'
import jwt from './plugins/jwt'
import 'dotenv/config';

const app = fastify({
  logger: true, 
})

app.register(fastifyCors, { 
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
})

app.register(cookie)
app.register(jwt)

app.register(authRoutes)
app.register(calculationRoutes)

app.get('/', async (request, reply) => {
  return { status: 'ok', message: 'API is running' }
})

const port = process.env.PORT ? Number(process.env.PORT) : 3333;
const host = '0.0.0.0';

app.listen({ port: port, host: host })
  .then(() => {
    console.log(`servidor rodando em ${port}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
