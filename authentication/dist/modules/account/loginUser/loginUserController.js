"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const loginUser_1 = require("./loginUser");
const kafka_messaging_adapter_1 = require("../../../infra/messaging/kafka/adapters/kafka-messaging-adapter");
class AuthenticateUserController {
    async handle(request, response) {
        const { username, password } = request.body;
        const kafkaMessagingAdapter = new kafka_messaging_adapter_1.KafkaMessagingAdapter();
        const authenticateUserModel = new loginUser_1.AuthenticateUserModel(kafkaMessagingAdapter);
        const result = await authenticateUserModel.execute({
            username,
            password,
        });
        return response.json(result);
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
