"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaMessagingAdapter = void 0;
const producer_1 = require("../producer");
class KafkaMessagingAdapter {
    async sendMessage(topic, message) {
        console.log(`[Authentications] New message on topic "${topic}"`);
        console.log(JSON.stringify(message, null, 2));
        await producer_1.producer.send({
            topic,
            messages: [
                { value: JSON.stringify(message) }
            ]
        });
    }
}
exports.KafkaMessagingAdapter = KafkaMessagingAdapter;
