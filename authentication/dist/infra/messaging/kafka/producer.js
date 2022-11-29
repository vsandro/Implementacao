"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.producer = void 0;
const kafka_1 = require("./kafka");
exports.producer = kafka_1.kafka.producer({
    allowAutoTopicCreation: true,
});
exports.producer.connect().then(() => {
    console.log('[Authentications] Kafka producer connected');
});
