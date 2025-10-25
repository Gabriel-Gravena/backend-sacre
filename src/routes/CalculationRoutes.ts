import { FastifyInstance } from "fastify";
import { calculationController } from "../controllers/CalculationController";
import { authenticateMiddleware } from "../middlewares/authenticate";

export async function calculationRoutes(app: FastifyInstance) {
    app.post("/simulation", { 
        preHandler: [authenticateMiddleware] 
    }, calculationController.create);

    app.get("/simulation/history", { 
        preHandler: [authenticateMiddleware] 
    }, calculationController.list);

    app.delete("/simulation/:id", { 
        preHandler: [authenticateMiddleware] 
    }, calculationController.delete);
}