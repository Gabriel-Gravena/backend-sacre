import { FastifyRequest, FastifyReply } from 'fastify';
import {
    registerUserService,
    registerUserSchema,
    loginUserService,
    loginUserSchema,
    logoutUserService,
    getProfileService,
} from '../services/AuthServices';
import { ZodError } from 'zod';

export const authController = {
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

            const { token, user } = await loginUserService(credentials, request.server, reply);

            reply.setCookie('token', token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60
            })

            return reply.status(200).send({ detail: 'Success', user: user })
            
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

            const user = await getProfileService(userId)

            return reply.status(200).send(user)
        } catch (error) {
            if (error instanceof Error && error.message === 'Usuario nao encontrado') {
                return reply.status(404).send({ detail: "Usuario nao encontrado" });
            }

            return reply.status(500).send({ detail: "Erro no servidor" });
        }
    }
}