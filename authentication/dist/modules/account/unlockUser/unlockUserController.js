"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlockUserController = void 0;
const unlockUser_1 = require("./unlockUser");
const kafka_messaging_adapter_1 = require("../../../infra/messaging/kafka/adapters/kafka-messaging-adapter");
class UnlockUserController {
    async handle(request, response) {
        const { username } = request.body;
        const kafkaMessagingAdapter = new kafka_messaging_adapter_1.KafkaMessagingAdapter();
        const unlockUserModel = new unlockUser_1.UnlockUserModel(kafkaMessagingAdapter);
        const result = await unlockUserModel.execute({
            username,
        });
        if (result) {
            await unlockUserModel.update({
                username,
            });
            return response.json({ return: "unlocked user" });
        }
        return response.json({ return: "Ok" });
    }
}
exports.UnlockUserController = UnlockUserController;
