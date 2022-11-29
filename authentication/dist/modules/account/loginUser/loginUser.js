"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserModel = void 0;
const prisma_1 = require("../../../database/prisma");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const elasticsearch_1 = __importDefault(require("../../../client/elasticsearch"));
class AuthenticateUserModel {
    constructor(messagingAdapter) {
        this.messagingAdapter = messagingAdapter;
    }
    async execute({ username, password }) {
        const user = await prisma_1.prisma.users.findFirst({
            where: {
                username,
            },
        });
        const clientElasticSearc = (0, elasticsearch_1.default)();
        if (!user) {
            throw new Error('Username or password invalid!');
        }
        if (user.blocked) {
            console.log('Username ' + username + ' blocked! Contact your System Administrator.');
            throw new Error('Username blocked! Contact your System Administrator.');
        }
        const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatch) {
            await this.messagingAdapter.sendMessage('authentications.new-authorization', {
                user: {
                    username: username,
                    message: "access denied",
                }
            });
            // Criar um registro no elasticsearch
            const result = await clientElasticSearc.index({
                index: 'elastic_index_login',
                type: 'type_elastic_login',
                body: {
                    username: username,
                    message: "access denied"
                }
            });
            const countFailed = user.failed + 1;
            if (countFailed === 3) {
                const updateUser = await prisma_1.prisma.users.update({
                    where: {
                        username,
                    },
                    data: {
                        blocked: true,
                    },
                });
                // Criar um registro no elasticsearch
                const result = await clientElasticSearc.index({
                    index: 'elastic_index_login',
                    type: 'type_elastic_login',
                    body: {
                        username: username,
                        message: 'user blocked'
                    }
                });
            }
            const updateUser = await prisma_1.prisma.users.update({
                where: {
                    username,
                },
                data: {
                    failed: countFailed,
                },
            });
            throw new Error('Username or password invalid!');
        }
        const token = (0, jsonwebtoken_1.sign)({ username }, '739f8ebd49733117a132c34fe866bc09', {
            subject: user.id,
            expiresIn: '1d', // Validade do TOKEN de acesso
        });
        const updateUser = await prisma_1.prisma.users.update({
            where: {
                username,
            },
            data: {
                failed: 0,
            },
        });
        await this.messagingAdapter.sendMessage('authentications.new-authorization', {
            user: {
                username: username,
                message: "authenticated",
            }
        });
        // Criar um registro no elasticsearch
        const result = await clientElasticSearc.index({
            index: 'elastic_index_login',
            type: 'type_elastic_login',
            body: {
                username: username,
                message: "authenticated"
            }
        });
        return token;
    }
}
exports.AuthenticateUserModel = AuthenticateUserModel;
