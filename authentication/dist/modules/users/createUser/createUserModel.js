"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserModel = void 0;
const bcrypt_1 = require("bcrypt");
const prisma_1 = require("../../../database/prisma");
class CreateUserModel {
    async execute({ password, username }) {
        const userExists = await prisma_1.prisma.users.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive',
                },
            },
        });
        if (userExists) {
            throw new Error('user already exists');
        }
        const hashPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = await prisma_1.prisma.users.create({
            data: {
                username,
                password: hashPassword,
            },
        });
        return user;
    }
}
exports.CreateUserModel = CreateUserModel;
