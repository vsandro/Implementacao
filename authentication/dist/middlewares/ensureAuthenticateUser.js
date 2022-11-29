"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnsureAuthenticateUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
async function EnsureAuthenticateUser(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({ message: 'Token missing' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, '739f8ebd49733117a132c34fe866bc09');
        request.id_client = sub;
        return next();
    }
    catch (error) {
        return response.status(401).json({ message: 'Invalid token!' });
    }
}
exports.EnsureAuthenticateUser = EnsureAuthenticateUser;
