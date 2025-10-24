import { AuthController } from "../controllers/AuthController";
import { authenticatePlugin } from "../middlewares/authenticate";
import { FastifyInstance } from "fastify";


export async function authRoutes (app: FastifyInstance) {
    app.post('/signup', AuthController.signUp);

    app.post('/signin', AuthController.signIn);

    app.post('/logout', {
        onRequest: [authenticatePlugin]
    }, AuthController.logout)

    app.get('/me', {
        onRequest: [authenticatePlugin]
    }, AuthController.me)
}

