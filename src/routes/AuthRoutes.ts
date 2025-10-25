import { authController } from "../controllers/AuthController";
import { authenticateMiddleware } from "../middlewares/authenticate";
import { FastifyInstance } from "fastify";


export async function authRoutes (app: FastifyInstance) {
    app.post('/signup', authController.signUp);

    app.post('/signin', authController.signIn);

    app.post('/logout', {
        preHandler: [authenticateMiddleware]
    }, authController.logout)

    app.get('/me', {
        preHandler: [authenticateMiddleware]
    }, authController.me)
}

