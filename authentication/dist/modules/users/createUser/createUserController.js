"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const createUserModel_1 = require("./createUserModel");
class CreateUserController {
    async handle(request, response) {
        const { username, password } = request.body;
        const createUserModel = new createUserModel_1.CreateUserModel();
        const result = await createUserModel.execute({
            username,
            password,
        });
        return response.json(result);
    }
}
exports.CreateUserController = CreateUserController;
