import { FastifyReply, FastifyRequest } from "fastify";
import {
    createSimulationService,
    getUserSimulationsService,
    deleteSimulationService,
} from "../services/CalculationServices";

export const calculationController = {
    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const userId = parseInt(request.user.sub);

            const simulation = await createSimulationService(userId, request.body as any);

            return reply.status(201).send(simulation);
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ detail: "Erro ao salvar simulação" });
        }
    },

    async list(request: FastifyRequest, reply: FastifyReply) {
        try {
            const userId = parseInt(request.user.sub);
            const simulations = await getUserSimulationsService(userId);

            return reply.status(200).send(simulations);
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ detail: "Erro ao buscar histórico" });
        }
    },

    async delete(request: FastifyRequest, reply: FastifyReply) {
        try {
            const userId = parseInt(request.user.sub);
            const { id } = request.params as { id: string };

            await deleteSimulationService(Number(id), userId);

            return reply.status(204).send();
        } catch (error) {
            if (error instanceof Error && error.message === "Simulação não encontrada") {
                return reply.status(404).send({ detail: "Simulação não encontrada" });
            }
            console.error(error);
            return reply.status(500).send({ detail: "Erro ao excluir simulação" });
        }
    },
};