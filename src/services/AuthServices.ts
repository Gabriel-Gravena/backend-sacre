import { FastifyInstance, FastifyReply } from 'fastify';
import { prisma } from '../plugins/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const registerUserSchema = z.object({
    email: z.email('Formato de email invalido.'),
    password: z.string().min(6, 'A senha deve conter no minimo 6 caracteres.')
});

export const loginUserSchema = z.object({
    email: z.email('Formato de email invalido.'),
    password: z.string().min(1, 'A senha é obrigatoria.')
})

type RegisterUserData = z.infer<typeof registerUserSchema>;
type LoginUserData = z.infer<typeof loginUserSchema>


const BCRYPT_ROUNDS = 12;


export async function registerUserService({ email, password }: RegisterUserData) {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
        throw new Error("Esse usuario ja esta cadastrado!");
    }

    const password_hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            email,
            password_hash,
        },
        select: {
            id: true,
            email: true,
            created_at: true
        }
    });

    return user;
}

export async function loginUserService({ email, password }: LoginUserData, fastify: FastifyInstance,
    reply: FastifyReply) {

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error("Email ou senha incorretos");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) {
        throw new Error("Email ou senha incorretos");
    }

    const token = fastify.jwt.sign(
        {},
        {
            sub: user.id.toString()
        }
    )

    return {
        token,
        user: {
            id: user.id,
            email: user.email
        }
    };
}

export function logoutUserService(reply: FastifyReply) {
    reply.clearCookie('token', {
        path: '/'
    });

    return { detail: 'Logout realizado com sucesso' };
}

export async function getProfileService(userId: number) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { 
            id: true, 
            email: true, 
            created_at: true 
        }
    });

    if (!user) {
        throw new Error("Usuario nao encontrado");
    }

    return user;
}