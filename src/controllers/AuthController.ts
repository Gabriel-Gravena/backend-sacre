import { FastifyRequest, FastifyReply } from 'fastify';
import {
    registerUserService,
    registerUserSchema,
    loginUserService,
    loginUserSchema,
    logoutUserService,
} from '../services/AuthServices';
import { prisma } from '../plugins/prisma';
import { ZodError } from 'zod';

export const AuthController = {
    async signUp(request: FastifyRequest, reply: FastifyReply) {
        try {
            const userData = registerUserSchema.parse(request.body);
            await registerUserService(userData);

            return reply.status(201).send({ detail: 'Success' });
        } catch (error) {
            if (error instanceof ZodError) {
                return reply.status(400).send({
                    detail: 'Dados inválidos'
                })
            }
            if (error instanceof Error && error.message.includes('Esse usuario ja esta cadastrado!')) {
                return reply.status(409).send({ detail: 'Este email já está cadastrado' });
            }

            return reply.status(500).send({ detail: 'Erro no servidor' })
        }
    },

    async signIn(request: FastifyRequest, reply: FastifyReply) {
        try {
            const credentials = loginUserSchema.parse(request.body);

            const result = await loginUserService(credentials, request.server, reply);

            return reply.status(200).send({ detail: 'Success', user: result.user })
        } catch (error) {
            if (error instanceof ZodError) {
                return reply.status(400).send({
                    detail: 'Dados inválidos'
                })
            }

            if (error instanceof Error) {
                if (error.message === 'Email ou senha incorretos') {
                    return reply.status(401).send({
                        detail: 'Email ou senha incorretos'
                    })
                }
            }


            return reply.status(500).send({ detail: 'Erro no servidor' });
        }
    },

    async logout(request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await logoutUserService(reply);

            return reply.status(200).send({ detail: 'Success' });
        } catch (error) {
            return reply.status(500).send({ detail: 'Erro no servidor' })
        }
    },

    async me(request: FastifyRequest, reply: FastifyReply) {
        try {
            const userId = parseInt(request.user.sub);

            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    email: true,
                    created_at: true
                }
            })

            if (!user) {
                return reply.status(404).send({ detail: "Usuario nao encontrado" })
            }

            return reply.status(200).send(user)
        } catch (error) {
            return reply.status(500).send({ detail: "Erro no servidor" })
        }
    }
}