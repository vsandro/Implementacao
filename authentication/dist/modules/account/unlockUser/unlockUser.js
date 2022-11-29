"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlockUserModel = void 0;
const prisma_1 = require("../../../database/prisma");
class UnlockUserModel {
    constructor(messagingAdapter) {
        this.messagingAdapter = messagingAdapter;
    }
    async execute({ username }) {
        const user = await prisma_1.prisma.users.findFirst({
            where: {
                username,
            },
        });
        if (!user) {
            throw new Error('Username invalid!');
        }
        if (!user.blocked) {
            console.log('user ' + username + ' not blocked');
            return false;
        }
        if (user.blocked) {
            console.log('unlocked user ' + username);
            await this.messagingAdapter.sendMessage('authentications.new-authorization', {
                user: {
                    username: username,
                    message: "unlocked user",
                }
            });
        }
        return true;
    }
    async update({ username }) {
        const updateUser = await prisma_1.prisma.users.update({
            where: {
                username,
            },
            data: {
                blocked: false,
                failed: 0,
            },
        });
    }
}
exports.UnlockUserModel = UnlockUserModel;
